const user = {
    id: 1,
    name: "John",
    age: 25,
};

console.log(user);

let x = 2;
let a = 7;
console.log(x >= 2 && a <= 7);

const array = ["Апельсин", "Яблоко", "Слива", "Банан"];

array.splice(array.length, 0, "Персик", "Киви", "Груша");

console.log(array);

const array2 = array.slice();
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

nums.forEach((el, index, array) => {
    if (el % 2 != 0) array[index] = 1
})
console.log(nums);

const cars = [
    {id: 1, model: "toyota", price: 1500},
    {id: 2, model: "opel", price: 600},
    {id: 3, model: "reno", price: 700},
]

const emailsString = "alex123@.ru; m223@.com; pp@g.com; upg3@.ru";

let str1 = " Hello World\nI\'m JavaScript ";

console.log(str1.trim())







