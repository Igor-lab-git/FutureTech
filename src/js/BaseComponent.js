class BaseComponent {
    constructor() {
        if(this.constructor === BaseComponent) {
            throw new Error("Не возможно создать экземпляр обстрактный класс BaseComponent")
        }
    }
    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop];

                target[prop] = newValue;
    
                if(newValue !== oldValue) {
                    this.upDateUI();
                }
                return true;
            },
        })
      }

      // перересовка UI в ответ обновления состояния

      upDateUI() {
        throw new Error("Необходимо реализовать upDateUI!")
      }
}

export default BaseComponent;