/*
 * Third-party video embeds (YouTube, Vimeo, ...).
 *
 * Embeds start as a click-to-load placeholder, so no request reaches the provider
 * until the visitor asks for the video. Once the matching service is accepted in
 * the consent manager, the placeholders are swapped for the real iframes
 * automatically and no extra click is needed.
 */
(function () {
  // Video provider -> service name declared in the consent manager.
  // Providers that are missing here stay click-to-load.
  var CONSENT_SERVICES = {
    youtube: "youtube",
  };

  var hooked = false;

  function loadEmbed(container) {
    if (container.classList.contains("video-embed--loaded")) return;

    var button = container.querySelector("[data-video-load]");
    if (!button || !button.dataset.videoSrc) return;

    var iframe = document.createElement("iframe");
    iframe.src = button.dataset.videoSrc;
    iframe.title = button.dataset.videoTitle;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    container.replaceChildren(iframe);
    container.classList.add("video-embed--loaded");
  }

  function accepted(manager, provider) {
    var service = CONSENT_SERVICES[provider];
    return Boolean(service && manager && manager.confirmed && manager.consents[service]);
  }

  function loadConsentedEmbeds(manager) {
    document
      .querySelectorAll("[data-video-embed]:not(.video-embed--loaded)")
      .forEach(function (container) {
        if (accepted(manager, container.dataset.videoProvider)) loadEmbed(container);
      });
  }

  // The "change cookie settings" control is only useful once the consent manager
  // is there and the visitor has already answered the banner.
  function refreshConsentControls(manager) {
    var usable = Boolean(manager && manager.confirmed);
    document.querySelectorAll("[data-video-consent-renew]").forEach(function (control) {
      control.hidden = !usable;
    });
  }

  function sync(manager) {
    loadConsentedEmbeds(manager);
    refreshConsentControls(manager);
  }

  function hook() {
    if (hooked || !window.klaro || typeof window.klaro.getManager !== "function") return;
    hooked = true;
    var manager = window.klaro.getManager();
    sync(manager);
    manager.watch({ update: function () { sync(manager); } });
  }

  document.addEventListener("click", function (event) {
    var renew = event.target.closest("[data-video-consent-renew]");
    if (renew) {
      event.preventDefault();
      if (window.klaro && typeof window.klaro.show === "function") window.klaro.show();
      return;
    }

    // Manual load, for visitors who did not consent to the provider.
    var button = event.target.closest("[data-video-load]");
    if (!button) return;

    var container = button.closest("[data-video-embed]");
    if (!container) return;

    loadEmbed(container);
  });

  // This script runs at the end of the body, before the deferred consent manager,
  // so the hook has to be retried once the document has been parsed.
  hook();
  document.addEventListener("DOMContentLoaded", hook);
  window.addEventListener("load", hook);
})();
