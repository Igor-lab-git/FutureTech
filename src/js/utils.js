const user = {
  id: 1,
  name: "John",
  age: 25,
  logUser() {
    return `Nema is ${this.name} and me ${this.age} `
  }
};

console.log(user.logUser());


const elena = {
  id: 1,
  name: "lena",
  age: 20,
}

const logElena = user.logUser.bind(elena);

console.log(logElena());




