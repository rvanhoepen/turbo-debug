/**
 * @jest-environment jsdom
 */
import { enableTurboDebug } from '../src/turbo-debug.js';

describe('Turbo Debug', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  test('adds debug class to body', () => {
    enableTurboDebug();
    expect(document.body.classList.contains('turbodebug')).toBe(true);
  });

  test('injects style tag into head', () => {
    expect(document.getElementById('turbodebug-styles')).toBeNull();
    enableTurboDebug();
    expect(document.getElementById('turbodebug-styles')).not.toBeNull();
  });

  test('marks visible turbo-frame elements', () => {
    // visible frame
    const frame1 = document.createElement('turbo-frame');
    frame1.id = 'frame1';
    document.body.appendChild(frame1);

    // hidden frame
    const frame2 = document.createElement('turbo-frame');
    frame2.id = 'frame2';
    frame2.style.display = 'none';
    document.body.appendChild(frame2);

    enableTurboDebug();

    expect(frame1.classList.contains('turbodebug')).toBe(true);
    expect(frame2.classList.contains('turbodebug')).toBe(false);
  });

  test('sets up a MutationObserver to listen for DOM changes', () => {
    const spy = jest.spyOn(MutationObserver.prototype, 'observe');
    enableTurboDebug();
    expect(spy).toHaveBeenCalledWith(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    spy.mockRestore();
  });

  test('responds to turbo:frame-load events', () => {
    const frame = document.createElement('turbo-frame');
    frame.id = 'frame-event';
    document.body.appendChild(frame);

    enableTurboDebug();

    // the frame should be marked on load
    expect(frame.classList.contains('turbodebug')).toBe(true);

    // simulate a turbo:frame-load event on a new frame
    const newFrame = document.createElement('turbo-frame');
    newFrame.id = 'frame-new';
    document.body.appendChild(newFrame);

    const event = new Event('turbo:frame-load', { bubbles: true, cancelable: true });
    newFrame.dispatchEvent(event);

    // wait for the throttled requestAnimationFrame to run
    return new Promise(requestAnimationFrame).then(() => {
      expect(frame.classList.contains('turbodebug')).toBe(true);
      expect(newFrame.classList.contains('turbodebug')).toBe(true);
    });
  });
});
