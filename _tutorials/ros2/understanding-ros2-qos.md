---
title: "ROS 2 QoS: Why Your Nodes Aren't Talking (and How to Fix It)"
excerpt: "A deep dive into ROS 2 Quality of Service: why QoS matters, every QoS policy explained, publisher/subscriber compatibility tables, and how to tune QoS using node parameters and qos_overrides."
author: "Walter Lucetti"
index: 1120
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/understanding-ros2-qos.jpg
  teaser: /assets/images/ros2/understanding-ros2-qos.jpg
  actions:
    - label: "<i class='fas fa-globe'></i> Official ROS 2 Website"
      url: "https://www.ros.org/"
      target: _blank
    - label: "<i class='fas fa-book'></i> ROS 2 QoS Settings Docs"
      url: "https://docs.ros.org/en/lyrical/Concepts/Intermediate/About-Quality-of-Service-Settings.html"
      target: _blank
layout: single
classes: single
---

## Introduction

Let me start with a confession. The single most frustrating bug I keep running into, and that I keep seeing new ROS 2 users run into, has nothing to do with broken code, segfaults, or build errors. It's two perfectly healthy nodes that simply *refuse to talk to each other*.

The publisher is up. The subscriber is up. `ros2 topic list` shows the topic. `ros2 node info` looks fine. And yet the subscriber's callback is never called, and `ros2 topic echo` prints nothing but a blinking cursor. No error, no warning, no crash. Just silence.

Nine times out of ten, the culprit is **QoS, Quality of Service**.

I promised in the [Understanding the ROS 2 Communication Middleware](/tutorials/ros2/understanding-ros2-middleware/) tutorial that I would dedicate a full chapter to QoS, and I mentioned it again, almost in passing, in the [Configure a ROS 2 node using parameters](/tutorials/ros2/configure-node-with-parameters/) tutorial when those mysterious `qos_overrides` parameters showed up. This is that chapter. By the end of it, that silent-topic bug will stop being a mystery and become a five-second diagnosis.

## What QoS actually is

In ROS 1, communication was essentially "fire and forget over TCP". You published, and if someone was listening with a matching type, they received the message. Simple, but rigid: you couldn't easily say *"I only care about the latest reading, drop the rest"* or *"deliver this map to anyone who joins late"*.

ROS 2 inherits from [DDS](/tutorials/ros2/understanding-ros2-middleware/) a much richer model. Every publisher and every subscription carries a **QoS profile**: a set of policies describing *how* data should be delivered, not *what* the data is. Think of it as a **contract**:

- The **publisher** declares the QoS it *offers*.
- The **subscription** declares the QoS it *requests*.
- The middleware connects the two **only if the offered QoS is compatible with the requested QoS**.

This last point is the whole game. If the contracts are incompatible, DDS does exactly what a good lawyer would do: it refuses to sign. The two endpoints stay disconnected and, historically the most painful part, it often happened *silently*. Modern ROS 2 distributions are much better at warning you, but the underlying rule hasn't changed.

> :pushpin: **Note**: QoS is set **independently** on each endpoint, and it is **immutable after creation**. You choose it when you create the publisher or the subscription, and you cannot change it on the fly. To "change" QoS you destroy the endpoint and recreate it, which is exactly what `qos_overrides` does for you at startup, as we'll see later.

## Why QoS matters in the real world

QoS isn't academic. It maps directly onto the kind of trade-offs you make every day on a real robot:

- **A LiDAR or camera stream**: you push hundreds of messages per second. If one frame is lost on a congested Wi‑Fi link, who cares; the next one is already on its way. You want *speed over guarantees*. That's `BEST_EFFORT` reliability.
- **A goal command or an emergency-stop flag**: losing this message is unacceptable. You want *guarantees over speed*. That's `RELIABLE`.
- **A static map or a robot description (`/tf_static`, `/map`, `/robot_description`)**: it's published once, but nodes that start *later* still need it. You want the last value to be *latched* and replayed to late joiners. That's `TRANSIENT_LOCAL` durability.

Pick the wrong profile and you get the classic failure modes I've personally burned hours on:

- Your image topic floods the network and starves your control loop, because you left it `RELIABLE` with a huge queue.
- Your subscriber never receives the static map, because it joined after the single publication and durability was `VOLATILE`.
- `ros2 topic echo` shows nothing on a sensor topic, because `echo` defaults to `RELIABLE` while the sensor publishes `BEST_EFFORT`, an incompatible contract, so no data.

That last one deserves a frame, because it catches *everyone* at least once.

> :pushpin: **The #1 QoS gotcha**: `ros2 topic echo /my_sensor_topic` defaults to a **reliable** subscription. If the topic is published with **best effort** (as most sensor drivers do), the contract is incompatible and you see *nothing*. The fix is to match the QoS:
>
> ```bash
> ros2 topic echo /my_sensor_topic --qos-reliability best_effort --qos-durability volatile
> ```

## The QoS policies in detail

A QoS profile is made of several policies. Let's go through each one, because understanding them individually is what lets you reason about compatibility later. The authoritative reference for the full list is the official [About Quality of Service Settings](https://docs.ros.org/en/lyrical/Concepts/Intermediate/About-Quality-of-Service-Settings.html){:target="_blank"} page, which is well worth keeping open in a tab as you read.

### History and Depth

These two control the **outgoing/incoming message queue**, what to keep when messages are produced faster than they can be sent or processed.

- **History**
  - `KEEP_LAST`: keep only the last *N* messages, where *N* is the **depth**. Old messages are dropped. This is the common, bounded-memory choice.
  - `KEEP_ALL`: keep *every* message, up to the resource limits configured in the underlying middleware. Depth is ignored.
- **Depth**: the size of the queue, the *N* used by `KEEP_LAST`. A depth of `1` means "only ever the latest message matters"; a depth of `10` is the typical default.

A good rule of thumb: high-rate sensor data → `KEEP_LAST` with a small depth (1–5). Sporadic but critical commands → `KEEP_LAST` with a depth large enough to absorb bursts.

### Reliability

This is the policy that decides whether delivery is guaranteed.

- `BEST_EFFORT`: send and don't look back. Fast, low overhead, but messages can be lost under load or on lossy links. Ideal for high-rate sensor streams.
- `RELIABLE`: the middleware retransmits until delivery is confirmed. No data loss, at the cost of latency and bandwidth. Ideal for commands, configuration, and anything you can't afford to miss.

### Durability

This decides whether *late-joining* subscriptions can receive messages that were published *before* they existed.

- `VOLATILE`: no history for late joiners. If you weren't subscribed when the message was sent, you missed it.
- `TRANSIENT_LOCAL`: the publisher keeps and re-sends the last *depth* messages to any subscription that joins later. This is the ROS 2 equivalent of ROS 1's **latched** topics, and it's exactly how `/tf_static`, `/map`, and `/robot_description` work.

### Deadline

The **maximum expected period between two consecutive messages** on a topic.

- The publisher *offers* a deadline: "I promise to publish at least this often."
- The subscription *requests* a deadline: "I expect a new message at least this often."
- If a deadline is missed, the middleware fires an event you can hook into, extremely useful for detecting a sensor that has gone quiet.

The default is "infinite" (no deadline), meaning the policy is effectively disabled.

### Lifespan

The **maximum time a message is valid** after being published. Once the lifespan expires, the message is removed from the queue and is *never* delivered, even if it hasn't been read yet. This is great for time-sensitive data where a stale value is worse than no value (think: a velocity command from two seconds ago). The default is "infinite".

### Liveliness

This is how the system decides whether a publisher is still **alive**.

- `AUTOMATIC`: the middleware considers all publishers of a node alive as long as the node itself is alive and responding. The easy, hands-off choice.
- `MANUAL_BY_TOPIC`: the publisher must *explicitly* assert its liveliness (by publishing or by calling an API) within the **lease duration**, otherwise it is declared dead. Useful when "the process is running" is not a strong enough guarantee that the data source is healthy.
- **Lease Duration**: the time window within which liveliness must be asserted.

### Summary of QoS policies

| Policy | Possible values | Default (topics) | What it controls |
| :--- | :--- | :--- | :--- |
| **History** | `KEEP_LAST`, `KEEP_ALL` | `KEEP_LAST` | Which messages are kept in the queue |
| **Depth** | any integer ≥ 0 | `10` | Queue size for `KEEP_LAST` |
| **Reliability** | `RELIABLE`, `BEST_EFFORT` | `RELIABLE` | Whether delivery is guaranteed |
| **Durability** | `VOLATILE`, `TRANSIENT_LOCAL` | `VOLATILE` | Whether late joiners get past messages |
| **Deadline** | duration | infinite (off) | Max expected period between messages |
| **Lifespan** | duration | infinite (off) | How long a message stays valid |
| **Liveliness** | `AUTOMATIC`, `MANUAL_BY_TOPIC` | `AUTOMATIC` | How a publisher is declared alive |
| **Lease Duration** | duration | infinite (off) | Liveliness assertion window |

## Built-in QoS profiles

You rarely build a profile policy-by-policy. ROS 2 ships a handful of **predefined profiles** tuned for common use cases, whose exact values are defined in the middleware layer's [`rmw/qos_profiles.h`](https://github.com/ros2/rmw/blob/rolling/rmw/include/rmw/qos_profiles.h){:target="_blank"} header. Knowing their values saves you from a lot of head-scratching, because they explain the defaults used by the CLI tools and by most nodes.

| Profile | History / Depth | Reliability | Durability | Typical use |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `KEEP_LAST` / 10 | `RELIABLE` | `VOLATILE` | General-purpose topics |
| **Sensor Data** | `KEEP_LAST` / 5 | `BEST_EFFORT` | `VOLATILE` | High-rate cameras, LiDAR, IMU |
| **Services** | `KEEP_LAST` / 10 | `RELIABLE` | `VOLATILE` | Service requests/replies |
| **Parameters** | `KEEP_LAST` / 1000 | `RELIABLE` | `VOLATILE` | Parameter service traffic |
| **Parameter Events** | `KEEP_LAST` / 1000 | `RELIABLE` | `VOLATILE` | The `/parameter_events` topic |
| **System Default** | system default | system default | system default | Let the RMW/DDS vendor decide |

> :pushpin: **Note**: the **Sensor Data** profile is `BEST_EFFORT`, while the **Default** profile is `RELIABLE`. This single difference is the root cause of most "I can't echo my camera topic" problems. When in doubt about a sensor topic, assume **Sensor Data**.

## QoS compatibility: the rule everyone trips over

Here is the heart of the matter. A connection is established **only if the QoS offered by the publisher satisfies the QoS requested by the subscription**. The mental model is a one-way inequality: the publisher must offer *at least as much* as the subscription asks for.

> **offered QoS ≥ requested QoS → compatible**

Let's make it concrete for the two policies that cause 95% of the trouble.

### Reliability compatibility

`RELIABLE` is "stronger" than `BEST_EFFORT`. A reliable publisher can satisfy a best-effort subscriber (it just stops caring about acknowledgements), but a best-effort publisher can *never* satisfy a subscriber that demands reliability.

| Publisher offers ↓ / Subscriber requests → | `BEST_EFFORT` | `RELIABLE` |
| :--- | :---: | :---: |
| **`BEST_EFFORT`** | ✅ connected (best effort) | ❌ **no connection** |
| **`RELIABLE`** | ✅ connected (best effort) | ✅ connected (reliable) |

### Durability compatibility

Same logic. `TRANSIENT_LOCAL` is "stronger" than `VOLATILE`. A transient-local publisher can serve a volatile subscriber, but a volatile publisher cannot serve a subscriber that wants history.

| Publisher offers ↓ / Subscriber requests → | `VOLATILE` | `TRANSIENT_LOCAL` |
| :--- | :---: | :---: |
| **`VOLATILE`** | ✅ connected (volatile) | ❌ **no connection** |
| **`TRANSIENT_LOCAL`** | ✅ connected (volatile) | ✅ connected (transient local) |

### Deadline and Liveliness compatibility

These follow the same "offered must be at least as strict as requested" principle, but expressed with durations:

| Policy | Compatible when... |
| :--- | :--- |
| **Deadline** | publisher's offered period **≤** subscriber's requested period |
| **Liveliness (kind)** | publisher's offered kind is **as strict or stricter** than requested (`MANUAL_BY_TOPIC` ≥ `AUTOMATIC`) |
| **Lease Duration** | publisher's offered lease **≤** subscriber's requested lease |

The recurring pattern across *all* policies: **the publisher must make a promise at least as strong as what the subscriber demands.** Memorize that one sentence and you can derive every table above from scratch.

## Diagnosing a QoS mismatch

When a topic stays silent, don't guess; inspect. The most useful command is [`ros2 topic info`](https://docs.ros.org/en/lyrical/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html){:target="_blank"} with the verbose flag:

```bash
ros2 topic info /my_topic --verbose
```

This prints, for every publisher and subscription on the topic, the **full QoS profile** of each endpoint. You can line them up against the tables above and spot the offending policy in seconds. For example, you might see a publisher with `Reliability: BEST_EFFORT` and a subscription with `Reliability: RELIABLE`; there's your culprit.

On recent distributions the middleware also emits a warning to the console when it detects an incompatible QoS pair, naming the exact policy that doesn't match. If you've enabled it, watch the logs:

```text
[WARN] New subscription discovered on topic '/my_topic', requesting incompatible QoS.
       No messages will be sent to it. Last incompatible policy: RELIABILITY
```

That single log line would have saved me an embarrassing number of hours over the years.

## Setting QoS using node parameters (`qos_overrides`)

Now to the part that ties this tutorial back to [Configure a ROS 2 node using parameters](/tutorials/ros2/configure-node-with-parameters/). Normally, QoS is hard-coded by the developer when the publisher or subscription is created. That's fine until you deploy on a different network, a flaky Wi‑Fi link, or a multi-robot setup where you'd love to retune QoS **without recompiling**.

ROS 2 solves this with **QoS overrides**: a mechanism that exposes a node's QoS settings as ordinary **node parameters**, so you can override them from the command line or, much more commonly, from a YAML file. If you want the full rationale and design behind this feature, the [QoS configurability](https://design.ros2.org/articles/qos_configurability.html){:target="_blank"} design article on the official ROS 2 design website is the canonical reference.

### Where those `qos_overrides` parameters come from

This is the detail that trips people up, so let me be blunt about it: **`qos_overrides` parameters only exist for endpoints whose author explicitly enabled them.** In C++ the developer passes [`QosOverridingOptions`](https://docs.ros.org/en/lyrical/p/rclcpp/generated/classrclcpp_1_1QosOverridingOptions.html){:target="_blank"} to `create_publisher`/`create_subscription`; in Python it's the equivalent [`qos_overriding_options`](https://docs.ros.org/en/lyrical/p/rclpy/rclpy.qos_overriding_options.html){:target="_blank"}. If the developer didn't opt in, there is nothing to override from parameters, and you have to fall back on whatever custom parameters the node exposes (more on that below).

When a node *does* opt in, listing its parameters reveals the override tree. Remember this from the parameters tutorial?

```bash
$ ros2 param list /talker
/talker:
    qos_overrides./parameter_events.publisher.depth
    qos_overrides./parameter_events.publisher.durability
    qos_overrides./parameter_events.publisher.history
    qos_overrides./parameter_events.publisher.reliability
    ...
```

The naming scheme is consistent and readable:

```text
qos_overrides.<topic_name>.<publisher|subscription>.<policy>
```

### Overriding QoS from a YAML file

The clean, version-controllable way is a parameter YAML file loaded at startup. Following the structure we covered in the [parameters tutorial](/tutorials/ros2/configure-node-with-parameters/) (`node_name` → `ros__parameters`), a QoS override looks like this:

```yaml
my_node:
    ros__parameters:
        qos_overrides:
            /my_sensor_topic:
                publisher:
                    reliability: best_effort
                    history: keep_last
                    depth: 5
                    durability: volatile
            /critical_command:
                subscription:
                    reliability: reliable
                    durability: transient_local
                    depth: 10
```

And you load it exactly as any other parameter file:

```bash
ros2 run my_pkg my_node \
    --ros-args --params-file /path/to/qos_config.yaml
```

> :pushpin: **Note**: by default a node only lets you override the policies it considers safe to change. A node can declare which policies are overridable, and can even register a **validation callback** that rejects a combination it knows would break it. So don't be surprised if some overrides are accepted and others are silently ignored or refused; that's by design, and it's the node author protecting you from yourself.

### Enabling QoS overrides in your own node (C++)

Enabling overrides on the developer side takes two steps. First, you attach a `QosOverridingOptions` to the publisher (or subscription) options. Second, and this is the part people forget, you must pass those options into **every** `create_publisher` / `create_subscription` call, because overrides are enabled per endpoint:

```cpp
// 1. Enable parameter-based QoS overrides on the options object
rclcpp::PublisherOptions pub_options;
pub_options.qos_overriding_options =
    rclcpp::QosOverridingOptions::with_default_policies();

// 2. Pass the options as the last argument when creating the endpoint.
//    The QoS you pass here is just the DEFAULT; parameters override it.
auto pub = create_publisher<sensor_msgs::msg::Image>(
    "image", rclcpp::SensorDataQoS(), pub_options);
```

The same applies to subscriptions, with the options object as the final argument. Mind the argument order: `create_subscription` takes the callback *before* the options:

```cpp
rclcpp::SubscriptionOptions sub_options;
sub_options.qos_overriding_options =
    rclcpp::QosOverridingOptions::with_default_policies();

auto sub = create_subscription<sensor_msgs::msg::Image>(
    "image", rclcpp::SensorDataQoS(),
    std::bind(&MyNode::imageCallback, this, std::placeholders::_1),
    sub_options);
```

> :pushpin: **Note**: `with_default_policies()` exposes only **history**, **depth**, and **reliability**. If you also want **durability** (or deadline, lifespan, liveliness) to be overridable, you have to list the policy kinds explicitly in the `QosOverridingOptions` constructor. It's also worth knowing that two endpoints sharing the same topic name and kind need a unique `id`, otherwise the parameter would be declared twice and `rclcpp` will throw.

To go beyond the default set of policies, list the `QosPolicyKind` values yourself. Here we make durability overridable too:

```cpp
rclcpp::PublisherOptions pub_options;
pub_options.qos_overriding_options = rclcpp::QosOverridingOptions{
    {
      rclcpp::QosPolicyKind::History,
      rclcpp::QosPolicyKind::Depth,
      rclcpp::QosPolicyKind::Reliability,
      rclcpp::QosPolicyKind::Durability,
    }
};
```

A common and tidy pattern in larger nodes is to keep a single shared `rclcpp::PublisherOptions` / `rclcpp::SubscriptionOptions` member, configure `qos_overriding_options` **once** in the constructor, and then reuse it for every endpoint the node creates:

```cpp
class MyNode : public rclcpp::Node
{
public:
  MyNode() : rclcpp::Node("my_node")
  {
    mPubOpt.qos_overriding_options =
        rclcpp::QosOverridingOptions::with_default_policies();
    mSubOpt.qos_overriding_options =
        rclcpp::QosOverridingOptions::with_default_policies();

    mPub = create_publisher<sensor_msgs::msg::Image>("image", mQos, mPubOpt);
    mSub = create_subscription<sensor_msgs::msg::Imu>(
        "imu", mQos,
        std::bind(&MyNode::imuCallback, this, std::placeholders::_1),
        mSubOpt);
  }

private:
  rclcpp::QoS mQos{10};                 // the DEFAULT profile
  rclcpp::PublisherOptions mPubOpt;
  rclcpp::SubscriptionOptions mSubOpt;
  // ... publisher/subscription handles and callbacks ...
};
```

With this pattern, **every** topic the node publishes or subscribes to automatically exposes its `qos_overrides.<topic>.<publisher|subscription>.<policy>` parameter tree, and the whole node becomes tunable from a single YAML file without recompiling.

### The pragmatic reality: check the docs

Standardizing on `qos_overrides` is clearly the direction the ecosystem is moving, but you'll still meet packages, and older releases of packages, that expose their **own**, friendlier QoS parameters (something like `video.qos_reliability`) and translate them internally into a profile. It's less standardized, but sometimes clearer for the end user. When you adopt a new package, always check its documentation to learn *which* of the two styles it uses before you start tuning.

## Conclusion

QoS is the layer that turns ROS 2 from "messages on a wire" into a system you can actually tune for the real world: lossy links, late joiners, high-rate sensors, and safety-critical commands. The mechanics boil down to three things worth remembering:

1. **QoS is a contract**, set per endpoint and immutable after creation.
2. **A connection happens only when the offered QoS is at least as strong as the requested QoS**; that one inequality generates every compatibility table.
3. When a topic is silent, **`ros2 topic info --verbose` is your friend**, and `qos_overrides` (or a driver's custom parameters) is how you fix it without recompiling.

Internalize the "offered ≥ requested" rule and the next silent topic won't cost you an afternoon; it'll cost you five seconds. For the full reference, the official [QoS Settings concept page](https://docs.ros.org/en/lyrical/Concepts/Intermediate/About-Quality-of-Service-Settings.html){:target="_blank"} and the hands-on [Quality of Service demo](https://docs.ros.org/en/lyrical/Tutorials/Demos/Quality-of-Service.html){:target="_blank"} are excellent next stops.

## Test your knowledge

**1. A publisher offers `BEST_EFFORT` reliability and a subscription requests `RELIABLE`. What happens?**

- a) They connect, and delivery is best effort
- b) They connect, and delivery is reliable
- c) They do not connect; the subscription receives no messages
- d) ROS 2 automatically downgrades the subscription to best effort

<details>
<summary>Show correct answer</summary>
<br>
<strong>c) They do not connect; the subscription receives no messages</strong><br>
A best-effort publisher cannot satisfy a subscription that demands reliability. The offered QoS is weaker than the requested QoS, so the contract is incompatible and no connection is established.
</details>

---

**2. Which durability setting makes a topic behave like a ROS 1 "latched" topic, delivering the last message to late-joining subscriptions?**

- a) `VOLATILE`
- b) `TRANSIENT_LOCAL`
- c) `KEEP_ALL`
- d) `RELIABLE`

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) TRANSIENT_LOCAL</strong><br>
With <code>TRANSIENT_LOCAL</code> durability, the publisher stores the last <em>depth</em> messages and re-sends them to subscriptions that join later. This is how <code>/tf_static</code>, <code>/map</code>, and <code>/robot_description</code> work. <code>RELIABLE</code> and <code>KEEP_ALL</code> are different policies (reliability and history), not durability.
</details>

---

**3. Why does `ros2 topic echo /my_camera/image` often show nothing for a camera stream?**

- a) The camera node is not actually publishing
- b) `echo` defaults to a reliable subscription while the camera publishes best effort, so the QoS is incompatible
- c) Images are too large to print in the terminal
- d) `echo` does not support sensor topics

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) echo defaults to a reliable subscription while the camera publishes best effort, so the QoS is incompatible</strong><br>
Most sensor drivers use the Sensor Data profile (<code>BEST_EFFORT</code>). Since <code>ros2 topic echo</code> subscribes with <code>RELIABLE</code> by default, the contract is incompatible. The fix is <code>ros2 topic echo /my_camera/image --qos-reliability best_effort</code>.
</details>

---

**4. Which command lets you inspect the full QoS profile of every publisher and subscription on a topic?**

- a) `ros2 topic list --qos`
- b) `ros2 topic hz /my_topic`
- c) `ros2 topic info /my_topic --verbose`
- d) `ros2 param get /my_topic qos`

<details>
<summary>Show correct answer</summary>
<br>
<strong>c) ros2 topic info /my_topic --verbose</strong><br>
The verbose flag prints the complete QoS profile (reliability, durability, history, depth, deadline, lifespan, liveliness) for each endpoint, letting you line them up and spot the incompatible policy.
</details>

---

**5. Which statements about `qos_overrides` node parameters are correct? (select all that apply)**

- a) They exist only for endpoints whose author explicitly enabled QoS overriding
- b) They follow the naming scheme `qos_overrides.<topic>.<publisher|subscription>.<policy>`
- c) They can be set from a YAML parameter file loaded with `--params-file`
- d) They let you change a publisher's QoS while it is running, without recreating it

<details>
<summary>Show correct answers</summary>
<br>
<strong>a) They exist only for endpoints whose author explicitly enabled QoS overriding, b) They follow the naming scheme qos_overrides.&lt;topic&gt;.&lt;publisher|subscription&gt;.&lt;policy&gt;, c) They can be set from a YAML parameter file loaded with --params-file</strong><br>
QoS is immutable after an endpoint is created, so (d) is wrong: overrides are applied <em>at creation time</em> (startup), not at runtime. The overrides only appear when the developer opts in with <code>QosOverridingOptions</code>, use the documented naming scheme, and are typically supplied through a YAML parameter file.
</details>

---

## What's next

The next tutorial of this series will cover **Services** and **Actions**: how request/reply and long-running goal-based communication differ from topics, and when to reach for each. **Stay tuned**.

**Happy robotics programming!** :robot:
