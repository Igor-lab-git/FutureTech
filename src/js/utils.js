const user = {
  id: 1,
  name: "John",
  age: 25,
};

console.log(user);

let x = 2;
let a = 7;
console.log(x >= 2 && a <= 7);


const createCar = (model, color, countDoor, isNew) => {
  return {
    model,
    color,
    countDoor,
    isNew
  }
}
const car = createCar("BMW", "red", 5, true);


console.log(car);

for(let key in car) {
  console.log(key + ": " + car[key]);
  
}
