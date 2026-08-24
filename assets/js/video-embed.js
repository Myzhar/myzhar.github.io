/*
 * Third-party video embeds (YouTube, Vimeo, ...).
 *
 * Embeds start as a click-to-load placeholder. When CookieBot reports consent
 * for the category the providers belong to, the placeholders are replaced by
 * the real iframes automatically, so no extra click is needed.
 */
(function () {
  const CONSENT_CATEGORY = "marketing";

  function loadEmbed(container) {
    if (container.classList.contains("video-embed--loaded")) return;

    const button = container.querySelector("[data-video-load]");
    if (!button || !button.dataset.videoSrc) return;

    const iframe = document.createElement("iframe");
    iframe.dataset.cookieconsent = "ignore";
    iframe.src = button.dataset.videoSrc;
    iframe.title = button.dataset.videoTitle;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    container.replaceChildren(iframe);
    container.classList.add("video-embed--loaded");
  }

  function cookiebot() {
    const cb = window.Cookiebot;
    return cb && typeof cb.renew === "function" ? cb : null;
  }

  function hasConsent() {
    const cb = cookiebot();
    return Boolean(cb && cb.consent && cb.consent[CONSENT_CATEGORY]);
  }

  function loadConsentedEmbeds() {
    if (!hasConsent()) return;
    document
      .querySelectorAll("[data-video-embed]:not(.video-embed--loaded)")
      .forEach(loadEmbed);
  }

  // The "change cookie settings" control is only useful once CookieBot is
  // there and the visitor has already answered the banner.
  function refreshConsentControls() {
    const cb = cookiebot();
    const usable = Boolean(cb && cb.hasResponse);
    document.querySelectorAll("[data-video-consent-renew]").forEach((control) => {
      control.hidden = !usable;
    });
  }

  function syncWithConsent() {
    loadConsentedEmbeds();
    refreshConsentControls();
  }

  document.addEventListener("click", (event) => {
    const renew = event.target.closest("[data-video-consent-renew]");
    if (renew) {
      const cb = cookiebot();
      if (cb) cb.renew();
      return;
    }

    // Manual load, for visitors who did not give consent.
    const button = event.target.closest("[data-video-load]");
    if (!button) return;

    const container = button.closest("[data-video-embed]");
    if (!container) return;

    loadEmbed(container);
  });

  // CookieBot consent, either resolved later or already stored from a previous visit.
  window.addEventListener("CookiebotOnConsentReady", syncWithConsent);
  window.addEventListener("CookiebotOnAccept", syncWithConsent);
  window.addEventListener("CookiebotOnDecline", refreshConsentControls);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncWithConsent);
  } else {
    syncWithConsent();
  }
})();
