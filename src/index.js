function highlightVisibleTurboFrames() {
  // remove the class so we can run this at any time during the lifecycle
  document
    .querySelectorAll('turbo-frame.turbodebug')
    .forEach((frame) => frame.classList.remove('turbodebug'));

  document.querySelectorAll('turbo-frame').forEach((frame) => {
    if (frame.offsetParent !== null) {
      // the frame is visible. offsetParent is null if it is hidden.
      frame.classList.add('turbodebug');
    }
  });
}

export function enableTurboDebug() {
  document.body.classList.add('turbodebug');

  highlightVisibleTurboFrames();

  document.addEventListener('turbo:frame-load', highlightVisibleTurboFrames);

  const observer = new MutationObserver(highlightVisibleTurboFrames);
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}
