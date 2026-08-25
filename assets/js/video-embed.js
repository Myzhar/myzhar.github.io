/*
 * Third-party video embeds (YouTube, Vimeo, ...).
 *
 * Embeds start as a click-to-load placeholder so that no request reaches the
 * provider until the visitor asks for the video.
 */
(function () {
  function loadEmbed(container) {
    if (container.classList.contains("video-embed--loaded")) return;

    const button = container.querySelector("[data-video-load]");
    if (!button || !button.dataset.videoSrc) return;

    const iframe = document.createElement("iframe");
    iframe.src = button.dataset.videoSrc;
    iframe.title = button.dataset.videoTitle;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    container.replaceChildren(iframe);
    container.classList.add("video-embed--loaded");
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-video-load]");
    if (!button) return;

    const container = button.closest("[data-video-embed]");
    if (!container) return;

    loadEmbed(container);
  });
})();
