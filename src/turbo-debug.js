import css from './turbo-debug.css';

function markFrame(frame) {
  frame.classList.add('turbodebug');

  // only set the position to relative if it's static
  const computed = window.getComputedStyle(frame);
  if (computed.position === 'static') {
    frame.dataset.turbodebugPosition = 'relative';
    frame.style.position = 'relative'
  }
}

function unmarkFrame(frame) {
  // unset the position so the layout can go back to normal
  if (frame.dataset.turbodebugPosition === 'relative') {
    frame.style.position = '';
    delete frame.dataset.turbodebugPosition;
  }

  frame.classList.remove('turbodebug');
}

function highlightVisibleTurboFrames() {
  // remove the class so we can run this at any time during the lifecycle
  document.querySelectorAll('turbo-frame.turbodebug').forEach((frame) => {
    unmarkFrame(frame);
  });

  document.querySelectorAll('turbo-frame').forEach((frame) => {
    if (frame.offsetParent !== null) {
      // the frame is visible. offsetParent is null if it is hidden.
      markFrame(frame);
    }
  });
}

export function enableTurboDebug() {
  if (!document.getElementById('turbodebug-styles')) {
    const style = document.createElement('style');
    style.id = 'turbodebug-styles'
    style.textContent = css;
    document.head.appendChild(style);
  }

  document.body.classList.add('turbodebug');

  highlightVisibleTurboFrames();

  document.addEventListener('turbo:frame-load', highlightVisibleTurboFrames);

  const observer = new MutationObserver(highlightVisibleTurboFrames);
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}
