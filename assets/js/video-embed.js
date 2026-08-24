document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-video-load]");
  if (!button) return;

  const container = button.closest("[data-video-embed]");
  if (!container) return;

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
});
