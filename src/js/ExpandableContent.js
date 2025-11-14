const rootSelector = "[data-js-expandable-content]";

class ExpandableContent {
  seclectors = {
    root: rootSelector,
    button: "[data-js-expandable-content-button]",
  };

  stateClasses = {
    isExpanded: "is-expanded",
  };

  animationParams = {
    duration: 500,
    easing: "ease",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElement = this.rootElement.querySelector(this.seclectors.button);
    this.bindEvents();
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement;
    this.rootElement.classList.add(this.stateClasses.isExpanded);
    this.rootElement.animate([
        {
            maxHeight: `${offsetHeight}px`
        },
        {
            maxHeight: `${scrollHeight}px`
        }
    ], this.animationParams)
  }

  onButtonClick = () => {
    this.expand();
  }

  bindEvents() {
    this.buttonElement.addEventListener("click", this.onButtonClick);
  }
}

class ExpandableContentCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ExpandableContent(element);
    });
  }
}

new ExpandableContentCollection();
