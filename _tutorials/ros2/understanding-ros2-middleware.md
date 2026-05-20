---
title: "Understanding the ROS 2 Communication Middleware"
excerpt: "Learn how ROS 2 handles communication between nodes and the underlying middleware."
author: "Walter Lucetti"
index: 1060
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/understanding-ros2-middleware.jpg
  teaser: /assets/images/ros2/understanding-ros2-middleware.jpg
  actions:
    - label: "<i class='fas fa-globe'></i> Official ROS 2 Website"
      url: "https://www.ros.org/"
      target: _blank
layout: single
classes: single
---

## Introduction

The ROS 2 communication middleware is a critical component that enables seamless interaction between different nodes in a robotic system.

ROS 2 radically improves on ROS 1 by embracing [a pluggable **middleware** layer](https://design.ros2.org/articles/ros_middleware_interface.html), enabling real-time communication, better reliability, and deployment at scale.

Understanding the [ROS 2 middleware](https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Different-Middleware-Vendors.html) is crucial for building efficient and scalable robotic applications, and sometimes it's the most difficult part to grasp.

This tutorial dives deep into the ROS 2 communication middleware, compares the main DDS-based implementations, and ends with a detailed look at Zenoh as an emerging alternative.

## ROS 2 Communication Stack in a Nutshell

ROS 2 follows a [layered architecture](https://design.ros2.org/articles/ros_middleware_interface.html) where the middleware is a replaceable component hidden behind the RMW (ROS Middleware) abstraction.

### Core concepts

- Nodes, topics, services, actions, and parameters are the application-level communication primitives ROS 2 developers interact with every day.
- The **RMW layer** defines a common interface that each supported middleware must implement (publish/subscribe, request/reply, discovery, QoS, etc.).
- Below RMW, the concrete middleware implementation is chosen at build or runtime (e.g., Fast DDS, Cyclone DDS, Connext, GurumDDS, or Zenoh).

In practice, you select the middleware through the `RMW_IMPLEMENTATION` environment variable, and ROS 2 uses the associated shared library to handle all wire-level communication.

## DDS and RTPS: The Foundation of ROS 2

Most ROS 2 distributions ship with multiple DDS or RTPS-based vendors. DDS (Data Distribution Service) is a standardized publish–subscribe middleware designed for distributed, real-time, and safety-critical systems.

### DDS key properties

- Data-centric pub/sub with strongly-typed topics and rich QoS (Quality of Service) policies (reliability, durability, deadline, latency budget, liveliness, etc.).
- Peer-to-peer discovery based on RTPS, avoiding a single central broker, which improves scalability and robustness.
- Built-in support for multicast, content filtering, and security (DDS Security standard).

ROS 2 maps its concepts almost directly to DDS entities (participants, publishers, subscribers, data writers/readers), so most behavior is defined by the chosen DDS vendor and QoS settings.

## Supported DDS Implementations in ROS 2

ROS 2 currently supports multiple DDS/RTPS vendors through different RMW implementations. The "core" ones you encounter in practice are: Fast DDS, Cyclone DDS, Connext DDS, and GurumDDS.

### Overview table

| Feature / Vendor         | Fast DDS (eProsima)                           | Cyclone DDS (Eclipse)                | Connext DDS (RTI)                       | GurumDDS (GurumNetworks)          |
|--------------------------|-----------------------------------------------|--------------------------------------|-----------------------------------------|-----------------------------------|
| **License**              | Apache 2.0                                    | EPL/EDL mix                          | Commercial                              | Commercial                        |
| **ROS 2 status**         | Default in many distros                       | Tier-1 in several distros            | Supported, but not always bundled       | Supported, less common            |
| **Focus**                | Performance, features, security               | Determinism, low latency, embedded   | Industrial-grade, tooling               | Embedded and low-resource systems |
| **QoS support**          | Full DDS QoS set                              | Full DDS QoS set                     | Full DDS QoS set                        | Full DDS QoS set                  |
| **Inter-vendor interop** | Generally good, with some service limitations | Known issues with services to others | Works with Fast DDS for topics/services | DDS standard-level interop        |

## Fast DDS - rmw_fastrtps_cpp

[Fast DDS](https://fast-dds.docs.eprosima.com/en/stable/) (formerly Fast RTPS) is a popular default ROS 2 middleware, especially in Ubuntu-based desktop/server deployments. It's the default DDS middleware in Foxy, Humble, Iron, Jazzy, and Kilted.

### Strengths

- Widely deployed, battle-tested in many ROS 2 tutorials and community projects, including typical `RMW_IMPLEMENTATION=rmw_fastrtps_cpp` setups.
- Good performance for large numbers of topics and nodes, with extensive QoS support and security features.
- Broad interoperability with other DDS vendors at the topic level, and mostly working services with Connext.

### Weak points

- Configuration can be complex, especially around discovery, multicast, and fine-grained QoS in large heterogeneous networks.
- Historically, some issues have appeared with reliability and discovery on Wi‑Fi or NATed networks, requiring tuning or XML profiles.

Use Fast DDS when you want a solid default, good tooling and community knowledge, and you are mostly in LAN or controlled network environments.

## Cyclone DDS - rmw_cyclonedds_cpp

[Cyclone DDS](https://cyclonedds.io/) is a modern, open-source DDS implementation with a strong focus on determinism and resource efficiency. It's the default DDS middleware in Galactic.

### Strengths

- Designed for embedded and real-time systems, offering predictable latency and good memory behavior.
- Can be easier to tune for deterministic behavior, and integrates well with mixed CPU/RTOS environments.
- Fully open-source and actively developed under the Eclipse Foundation umbrella.

### Weak points

- While topics interoperate with other vendors, services and actions have known interoperability limitations with Fast DDS and Connext, especially in older distros.
- Community documentation is still less extensive than Fast DDS in the ROS 2 ecosystem.

Cyclone DDS is a strong choice when you care about real-time performance and deterministic behavior, and your system is dominated by a single vendor (all nodes using Cyclone) to avoid cross-vendor service issues.

## Connext DDS - rmw_connextdds

[Connext DDS](https://www.rti.com/products) by RTI targets industrial and safety-critical domains, and ROS 2 supports it through a dedicated RMW.

### Strengths

- Rich set of enterprise tools: monitoring, recording, visualization, and debugging.
- Proven track record in aerospace, defense, and medical fields, useful if your ROS 2 system must integrate with existing Connext deployments.
- Good interoperability with Fast DDS at the topic and (tested) service level.

### Weak points

- Commercial licensing, which may not fit all open-source or academic projects.
- Installation and integration with ROS 2 are more involved than the default open-source vendors.

Connext DDS fits best in projects that already use RTI tooling or require safety-certified middleware.

## GurumDDS - rmw_gurumdds

[GurumDDS](https://www.omg.org/dds-directory/vendor/GurumNetworks_Inc.html) is another DDS implementation supported in ROS 2, especially in some embedded and commercial contexts.

### Strengths

- Designed with embedded systems in mind, offering a small footprint and low latency.
- Fully supports the DDS specification and QoS suite.

### Weak points

- Less visible in the open ROS 2 community; fewer public examples and benchmarks available.
- Commercial licensing similar to Connext.

You typically consider GurumDDS when working with vendors or platforms that already include it as part of their stack.

## Interoperability Between DDS Vendors

One promise of DDS is vendor interoperability, and ROS 2 does leverage that, but there are caveats.

### What generally works

- Topics with compatible types and QoS settings typically interoperate across Fast DDS, Connext, and Cyclone, allowing mixed-vendor deployments.
- In-system tests confirm that topics publish/subscribe consistently among core vendors for supported distributions.

### Known limitations

- Services and actions are more fragile: for example, Cyclone DDS has known issues with services when interacting with Fast DDS or Connext in some distributions, sometimes even leading to crashes on deserialization.
- Some features (security configurations, content filtering, discovery tuning) are vendor-specific, so advanced setups may not be fully portable.

In a production system, try to standardize on a single DDS vendor whenever possible, and treat cross-vendor communication as a constrained interface that you test explicitly.

## Zenoh and rmw_zenoh: A Different Approach

[Zenoh](https://zenoh.io/) **is not a DDS implementation**; it is a data-centric communication protocol and architecture that unifies pub/sub, queries, and storage, targeting constrained, fog, and cloud environments. ROS 2 integrates Zenoh through `rmw_zenoh`, an RMW that uses Zenoh as its underlying transport instead of DDS.

### Why Zenoh?

- Aims to simplify some of the pain points seen with DDS in ROS 2, especially around configuration complexity and non-LAN deployments.
- Designed from the ground up for heterogeneous networks (LAN, WAN, cellular, intermittent connectivity) and constrained devices.
- Supports routing, bridging, and data persistence in a unified stack, which is attractive for multi-robot and cloud-robotics scenarios.

### rmw_zenoh in ROS 2

`rmw_zenoh_cpp` maps ROS 2 entities directly to Zenoh constructs.

- Publishers and subscribers become Zenoh publishers/subscribers, with "liveliness tokens" to track presence and availability.
- Services and actions are implemented using Zenoh queryables and queries, mapping request–response semantics to Zenoh's API.
- The implementation was introduced alongside newer ROS 2 distributions (e.g., Humble) and is evolving as a first-class alternative to DDS-based RMWs.

The main design goal is to preserve ROS 2 semantics while leveraging Zenoh's capabilities to improve performance and operability across challenging networks.

## DDS vs Zenoh: Conceptual Differences

From a ROS 2 developer perspective, switching from DDS to Zenoh is "just" changing the RMW, but under the hood the paradigms differ.

### Conceptual comparison

| Aspect                        | DDS vendors                                        | Zenoh                                                         |
|-------------------------------|----------------------------------------------------|---------------------------------------------------------------|
| **Standardization**           | OMG DDS and RTPS standards                         | Zenoh-specific protocol and APIs                              |
| **Discovery**                 | Peer-to-peer, multicast-centric                    | Flexible, supports routed/federated topologies                |
| **Network model**             | Mostly LAN, VPN-friendly, WAN possible with tuning | Designed for LAN, WAN, and constrained links                  |
| **Features beyond pub/sub**   | DDS RPC, some recording tools                      | Integrated queries, storage, routing                          |
| **Configuration complexity**  | XML profiles, vendor-specific parameters           | Configuration tends to be simpler; focus on routing, sessions |
| **ROS 2 maturity**            | Long-standing, production use today                | Newer, rapidly evolving RMW                                   |

In high-level terms, DDS focuses on standardized peer-to-peer pub/sub, while Zenoh targets a broader "data plane" across diverse networks with built-in routing and persistence.

## Choosing the Right Middleware for Your Robot

Given this landscape, the "best" middleware depends on your use case.

### When to prefer DDS

- You need strict DDS standard compliance or must integrate with existing DDS-based systems.
- Your deployment is mostly within a LAN or a controlled industrial network where DDS discovery works well.
- You rely on vendor-specific tooling (RTI Monitor, Fast DDS Monitor, etc.) or certification roadmaps.

### When to consider Zenoh

- You are building multi-robot systems where robots span different networks, 4G/5G links, or cloud endpoints.
- You want a single technology to handle pub/sub, queries, and data persistence across edge–fog–cloud.
- You struggle with DDS discovery across NATs or complex network topologies and prefer an explicit routed architecture.

Because ROS 2 uses the RMW abstraction, you can prototype with one middleware and later benchmark another using the same nodes, just by switching `RMW_IMPLEMENTATION` and installing the corresponding packages.

## How to Install and Use Different RMWs

You switch RMW by (1) installing the desired RMW, (2) exporting `RMW_IMPLEMENTATION`, and (3) restarting the ROS 2 daemon if needed.

### 1. Check what RMWs you have

Open a terminal console and enter:

```bash
env | grep RMW_IMPLEMENTATION   # often empty → default Fast DDS
# or
ros2 doctor --report | grep middleware
```

`ros2 doctor` will show the active middleware, e.g., `rmw_fastrtps_cpp` or `rmw_cyclonedds_cpp`. For example:

```bash
$ ros2 doctor --report | grep middleware
middleware name    : rmw_fastrtps_cpp
```

### 2. Install the RMW implementation

Examples:

- Fast DDS RMW (usually already installed by default):

    ```bash
    sudo apt install ros-$ROS_DISTRO-rmw-fastrtps-cpp
    ```  

- Cyclone DDS RMW:

    ```bash
    sudo apt install ros-$ROS_DISTRO-rmw-cyclonedds-cpp
    ```

- Connext (requires separate RTI install, then):

    ```bash
    sudo apt install ros-$ROS_DISTRO-rmw-connextdds
    ```

- GurumDDS (after installing GurumDDS):

    ```bash
    sudo apt install ros-$ROS_DISTRO-rmw-gurumdds-cpp
    ```

- Zenoh:

    ```bash
    sudo apt install ros-$ROS_DISTRO-rmw-zenoh-cpp
    ```

### 3. Switch RMW per-shell

Use the `RMW_IMPLEMENTATION` environment variable when running nodes.

Examples:

```bash
# Fast DDS
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp

# Cyclone DDS
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp

# Connext
export RMW_IMPLEMENTATION=rmw_connextdds

# GurumDDS
export RMW_IMPLEMENTATION=rmw_gurumdds_cpp

# Zenoh
export RMW_IMPLEMENTATION=rmw_zenoh_cpp
```

Then run your nodes as usual:

```bash
ros2 run demo_nodes_cpp talker
ros2 run demo_nodes_cpp listener
```

This works the same in every ROS 2 distribution.

### 4. Make a default RMW for your user

To make the choice persistent, enter one of the following according to the selected RMW:

```bash
# Fast DDS
echo 'export RMW_IMPLEMENTATION=rmw_fastrtps_cpp' >> ~/.bashrc

# Cyclone DDS
echo 'export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp' >> ~/.bashrc

# Connext
echo 'export RMW_IMPLEMENTATION=rmw_connextdds' >> ~/.bashrc

# GurumDDS
echo 'export RMW_IMPLEMENTATION=rmw_gurumdds_cpp' >> ~/.bashrc

# Zenoh
echo 'export RMW_IMPLEMENTATION=rmw_zenoh_cpp' >> ~/.bashrc
```

Open a new terminal (or `source ~/.bashrc`), then verify with:

```bash
ros2 doctor --report | grep middleware
```

You should see your chosen implementation.

### 5. Important detail: ROS 2 daemon

If you switch RMW while the ROS 2 daemon is running, CLI tools can get confused.

Before testing a new RMW:

```bash
ros2 daemon stop
ros2 daemon start
```

This forces CLI tools (`ros2 node`, `ros2 topic`, etc.) to use the new RMW implementation.

## ROS 2 daemon? What's that?

This is the first time I've introduced the concept of the ROS 2 daemon. Let's try to understand what it is and why it's useful.

The ROS 2 daemon is a background process that caches information about the ROS graph to make command-line introspection fast and responsive. It is an optimization for tooling, not a core part of the runtime like the ROS 1 master.

### What the ROS 2 daemon is

- It is a long-running helper node started automatically the first time you use certain `ros2` CLI commands (e.g., `ros2 node list`, `ros2 topic list`).
- It listens to discovery traffic and maintains an internal cache of nodes, topics, services, and other graph entities currently present in the system.
- It communicates with the CLI tools over localhost (e.g., using XML-RPC) to answer "what exists in the graph?" queries quickly.

### What the ROS 2 daemon is needed for

#### 1. Speeding up CLI introspection

Without the daemon, every CLI call must directly perform discovery via the underlying middleware, which can take noticeable time as the system grows. The daemon amortizes this cost by continuously tracking the graph so that commands like:

- `ros2 node list`
- `ros2 topic list`
- `ros2 service list`

can return almost immediately from the cached state.

#### 2. Avoiding repeated discovery work

Each new CLI call would otherwise have to "re-discover" the network to answer the same questions (which nodes/topics exist), duplicating work that the running daemon has already done. By centralizing this discovery for the workstation, it reduces overhead and improves responsiveness, especially in larger systems.

#### 3. Optional helper, not mandatory infrastructure

- ROS 2 nodes communicate purely via distributed discovery in the middleware; they do not depend on the daemon to run, unlike ROS 1 nodes that depended on the master.
- If the daemon is not running, CLI tools still work; they just perform discovery themselves and are slower.
- You can explicitly start/stop and query it using commands like `ros2 daemon start`, `ros2 daemon stop`, and `ros2 daemon status`, or bypass it with `--no-daemon` when you want to force direct discovery.

In short, the daemon is there to **accelerate** and stabilize ROS 2 introspection from the command line by caching the ROS graph, but it is not required for the core pub/sub/service communication between nodes.

## Conclusions

Choosing the right RMW implementation is crucial for the performance and compatibility of your ROS 2 applications. By understanding the strengths and weaknesses of each middleware option, you can make informed decisions that align with your project's requirements. Remember to test your setup thoroughly and consult the documentation for any specific configuration details.

A final note: I cited QoS (Quality of Service) settings throughout this guide, but I consciously avoided deep diving into them. QoS settings are essential for fine-tuning the behavior of your ROS 2 nodes and ensuring reliable communication, especially in complex systems. I will dedicate a special section to QoS settings in a future tutorial.
