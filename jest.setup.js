// mock MutationObserver globally. It needs a full DOM to work correctly.
global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target, options) {
    this.target = target;
    this.options = options;
  }
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// mock element.offsetParent globally. It is null in headless tests.
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  get() {
    return this.style.display === 'none' ? null : document.body;
  },
});
