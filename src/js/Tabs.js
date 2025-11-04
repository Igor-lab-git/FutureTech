
const rootSelector = "[data-js-tabs]";

class Tabs {
    selectors = {
        root: rootSelector,
        button: "[data-js-tab-button]",
        content: "[data-js-tab-content]",
    }

    stateClasses = {
        isActive: "is-active",
    }

    stateAttributes = {
        ariaSelected: "aria-selected",
        tabIndex: "tabindex",
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.state = {
            activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive)),
        }
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }

    upDateUI() {
        const { activeTabIndex } = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex;
            buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex;
            contentElement.classList.toggle(this.stateClasses.isActive, isActive);
        });
    }

    onButtonClick(buttonIndex) {
         this.state.activeTabIndex = buttonIndex;
         this.upDateUI();
    }

    bindEvents() {
        this.buttonElements.forEach((button, index) => {
            button.addEventListener("click", () => this.onButtonClick((index)));
        })
    }
};

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        })
    }
};

new TabsCollection()

export default TabsCollection;