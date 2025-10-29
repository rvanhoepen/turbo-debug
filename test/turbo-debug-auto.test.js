/**
 * @jest-environment jsdom
 */
describe('Turbo Debug Auto', () => {
  let enableTurboDebugMock;

  beforeEach(() => {
    jest.resetModules();
    document.head.innerHTML = '';
    document.body.innerHTML = '';

    enableTurboDebugMock = jest.fn();
    jest.doMock('../src/turbo-debug.js', () => ({
      enableTurboDebug: enableTurboDebugMock,
    }));
  });

  function loadAutoModule() {
    require('../src/turbo-debug-auto.js');
  }

  test('calls enableTurboDebug immediately if DOM is already ready', () => {
    Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });

    loadAutoModule();

    expect(enableTurboDebugMock).toHaveBeenCalled();
  });

  test('calls enableTurboDebug later when DOM becomes ready', () => {
    Object.defineProperty(document, 'readyState', { value: 'loading', configurable: true });

    const addEventSpy = jest.spyOn(document, 'addEventListener');

    loadAutoModule();

    expect(addEventSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));

    const listener = addEventSpy.mock.calls.find(([event]) => event === 'DOMContentLoaded')[1];

    expect(enableTurboDebugMock).not.toHaveBeenCalled();

    // simulate DOMContentLoaded
    listener();

    addEventSpy.mockRestore();
  });
});
