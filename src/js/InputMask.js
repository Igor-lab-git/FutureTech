const rootSelector = "[data-js-input-mask]";

class InputMask {
  constructor(element) {
    this.rootElement = element;
    this.init();
  }

  init() {
    const isLibReady = typeof window.IMask !== "undefined";

    if(isLibReady) {
        window.IMask(this.rootElement, {
            mask: this.rootElement.dataset.jsInputMask,
        });
    } else {
        console.error("Библиотека IMask не подключена")
    }
  }
}

class InputMaskCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new InputMask(element);
    });
  }
}

new InputMaskCollection();
