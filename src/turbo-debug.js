import css from './turbo-debug.css';

let scheduled = false;
let observer;

function markFrame(frame) {
  if (frame.classList.contains('turbodebug')) return;

  frame.classList.add('turbodebug');

  // only set the position to relative if it's static
  const computed = window.getComputedStyle(frame);
  if (computed.position === 'static') {
    frame.dataset.turbodebugPosition = 'relative';
    frame.style.position = 'relative';
  }
}

function unmarkFrame(frame) {
  if (!frame.classList.contains('turbodebug')) return;

  // unset the position so the layout can go back to normal
  if (frame.dataset.turbodebugPosition === 'relative') {
    frame.style.position = '';
    delete frame.dataset.turbodebugPosition;
  }

  frame.classList.remove('turbodebug');
}

function isVisible(frame) {
  return frame.offsetParent !== null;
}

function isHidden(frame) {
  return !isVisible(frame);
}

function highlightVisibleTurboFrames() {
  // check for frames previously marked that might no longer be visible
  document.querySelectorAll('turbo-frame.turbodebug').forEach((frame) => {
    if (isHidden(frame)) {
      unmarkFrame(frame);
    }
  });

  document.querySelectorAll('turbo-frame').forEach((frame) => {
    if (isVisible(frame)) {
      // the frame is visible. offsetParent is null if it is hidden.
      markFrame(frame);
    }
  });
}

function scheduleHighlight() {
  if (scheduled) return;
  scheduled = true;

  requestAnimationFrame(() => {
    highlightVisibleTurboFrames();
    scheduled = false;
  });
}

export function enableTurboDebug() {
  if (!document.getElementById('turbodebug-styles')) {
    const style = document.createElement('style');
    style.id = 'turbodebug-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  document.body.classList.add('turbodebug');

  highlightVisibleTurboFrames();

  document.addEventListener('turbo:frame-load', scheduleHighlight);

  observer = new MutationObserver(scheduleHighlight);
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}

export function disableTurboDebug() {
  document.body.classList.remove('turbodebug');
  document.getElementById('turbodebug-styles')?.remove();

  document.querySelectorAll('turbo-frame').forEach((frame) => unmarkFrame(frame));

  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
