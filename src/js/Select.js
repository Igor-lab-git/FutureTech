import BaseComponent from "./BaseComponent.js";
import MatchMedia from "./MatchMedia.js";

const rootSelector = "[data-js-select]";

class Select extends BaseComponent  {
    selectors = {
        root: rootSelector,
        originalControl:   "[data-js-select-original-control]",
        button: "[data-js-select-button]",
        dropdown: "[data-js-select-dropdown]",
        option: "[data-js-select-option]",
    }

    stateClasses = {
        isExpanded: "is-expanded",
        isSelected: "is-selected",
        isCurrent: "is-current",
        isOnTheLeftSide: "is-on-the-left-side",
        isOnTheRightSide: "is-on-the-right-side",
    }

    stateAttributes = {
        ariaExpanded: "aria-expanded", //сообщает вспомогательным технологиям, что элемент разворачивает и сворачивает другое содержимое.
        ariaSelected: "aria-selected", // указывает на текущее состояние выбора элемента внутри группы выбираемых элементов
        ariaActivedescendant: "aria-activedescendant", // указывает на текущий активный элемент, когда фокус находится на определённом компоненте, таком как составной виджет, комбобокс, текстовое поле, группа или приложение
    }

    initialState = {
        isExpanded: false,
        currentOptionIndex: null,
        selectedOptionElement: null,
    }
    constructor(element) {
        super();
        this.rootElement = element;
        this.originalControlElement = this.rootElement.querySelector(this.selectors.originalControl);
        this.buttonElement = this.rootElement.querySelector(this.selectors.button);
        this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown);
        this.optionElements = this.dropdownElement.querySelectorAll(this.selectors.option);
        this.state = this.getProxyState({
            ...this.initialState,
            currentOptionIndex: this.originalControlElement.selectedIndex,
            selectedOptionElement: this.optionElements[this.originalControlElement.selectedIndex],
        });
        this.fixDropdownPosition();
        this.upDateTabIndexed();
        this.bindEvents();
    }

    upDateUI() {
        const { isExpanded, currentOptionIndex, selectedOptionElement } = this.state;

        const updateoriginalControl = () => {
            this.originalControlElement.value = selectedOptionElement.textContent.trim();
        };
        const updateButton = () => {
            this.buttonElement.texContent = selectedOptionElement.textContent.trim();
            this.buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded);
            this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded);
            this.buttonElement.setAttribute(this.stateAttributes.ariaActivedescendant, this.optionElements[currentOptionIndex].id);
        };
        const updateDropdown = () => {
            this.dropdownElement.classList.toggle(this.stateClasses.isExpanded, isExpanded);
        };
        const updateOptions = () => {
            this.optionElements.forEach((optionElement, index) => {
                const isCurrent = currentOptionIndex === index;
                const isSelected = selectedOptionElement === optionElement;
                optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent);
                optionElement.classList.toggle(this.stateClasses.isSelected, isSelected);
                optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)
            })
        };

        updateoriginalControl();
        updateButton();
        updateDropdown();
        updateOptions();
      }

      toggleExpandedState() {
        this.state.isExpanded = !this.state.isExpanded;
      }

      expand() {
        this.state.isExpanded = true;
      }

      collapse() {
        this.state.isExpanded = false;
      }

      fixDropdownPosition() {
        const viewportWidth = document.documentElement.clientWidth;
        const halfViewportX = viewportWidth / 2;
        const { width, x } = this.buttonElement.getBoundingClientRect();
        const buttonCentrX = x + width / 2;
        const isButtonOnTheViewportSize = buttonCentrX < halfViewportX;

        this.dropdownElement.classList.toggle(
            this.stateClasses.isOnTheLeftSide,
            isButtonOnTheViewportSize
        )

        this.dropdownElement.classList.toggle(
            this.stateClasses.isOnTheRightSide,
            !isButtonOnTheViewportSize
        )
        
      }

      upDateTabIndexed(isMediaDevice = MatchMedia.mobile.matches) {

        this.originalControlElement.tabIndex = isMediaDevice ? 0 : -1;
        this.buttonElement.tabIndex = isMediaDevice ? -1 : 0;
      }

      get isNeedToExpand() {
        const isButtonFocused = document.activeElement === this.buttonElement;
        return (!this.state.isExpanded && isButtonFocused);
      }
      
      selectCurrentOption() {
        this.state.selectedOptionElement = this.optionElements[this.state.currentOptionIndex]
      }

      onButtonClick = () => {
        this.toggleExpandedState();
      }

      onClick = (event) => {
        const { target } = event;
        const isOutsideDropdownClick = target.closest(this.selectors.dropdown) !== this.dropdownElement;
        const isButtonClick = target === this.buttonElement;

        if(!isButtonClick && isOutsideDropdownClick) {
            this.collapse();
            return;
        }

        const isOptionClick = target.matches(this.selectors.option);

        if(isOptionClick) {
            this.state.selectedOptionElement = target;
            this.state.currentOptionIndex = [...this.optionElements].findIndex((optionElement) => optionElement === target);
            this.collapse();
        }
      }

      onArrowUpKeyDown = () => {
        if(isNeedToExpand()) {
            this.expand();
            return;
        }

        if(this.state.currentOptionIndex > 0) {
            this.state.currentOptionIndex--
        }
      }

      onArrowDownKeyDown = () => {
        if(isNeedToExpand()) {
            this.expand();
            return;
        }

        if(this.state.currentOptionIndex < this.optionElements.length - 1) {
            this.state.currentOptionIndex++
        }
      }

      onSpaceKeyDown = () => {
        if(isNeedToExpand()) {
            this.expand();
            return;
        }

        this.selectCurrentOption()
        this.collapse()
      }

      onEnterKeyDown = () => {
        if(isNeedToExpand()) {
            this.expand();
            return;
        }

         this.selectCurrentOption()
        this.collapse()
      }

      onKeyDown= (event) => {
        const { code } = event;

        const action = {
            ArrowUp: this.onArrowUpKeyDown,
            ArrowDown: this.onArrowDownKeyDown,
            Space: this.onSpaceKeyDown,
            Enter: this.onEnterKeyDown,
        }[code];

        if(action) {
            event.preventDefault();
            action();
        }
      }

      onMobileMatchMediaChange = (event) => {
        this.upDateTabIndexed(event.matches)
      }

      onOriginalControlChange = () => {
        this.state.selectedOptionElement = this.optionElements[this.originalControlElement.selectedIndex];
      }

      bindEvents() {
        MatchMedia.mobile.addEventListener("change", this.onMobileMatchMediaChange);
        this.buttonElement.addEventListener("click", this.onButtonClick);
        document.addEventListener("click", this.onClick);
        this.rootElement.addEventListener("keyDown", this.onKeyDown);
        this.originalControlElement.addEventListener("change", this.onOriginalControlChange)
      }
}

class SelectCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Select(element);
    });
  }
}

new SelectCollection();
