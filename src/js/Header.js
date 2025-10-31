class  Header {
    selectors = {
        rootHeaderAttribute: "[data-js-header]",
        overlayMenuAttribute: "[data-js-header-overlay]",
        burgerMenuAttribute: "[data-js-header-burger-button]",
    };
    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock",
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.rootHeaderAttribute);
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlayMenuAttribute);
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerMenuAttribute);
        this.bindEvents();
    }

    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener("click", this.onBurgerButtonClick)
    }
}

 new Header();


