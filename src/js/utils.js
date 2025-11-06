
const str = "Начало строки и конец снова начало Строки и Конец";
const number = "+7 (908) 237-05-01"

console.log(str.split(" ").map(word => word[0].toUpperCase() ? word.toLowerCase() : word).join(" "));
console.log(str.slice(-6));


const array1 = ["Igor", "John", "Elena", "Peter", "Jenna", []];
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const data = ["Jenna", 23];

const users = [
    {name: "Igor", age: 20},
    {name: "John", age: 36},
    {name: "Elena", age: 28},
    {name: "Peter", age: 17},
    {name: "Jenna", age: 23},
]

console.log([...users].sort((a, b) => b.age - a.age));
console.log(users);

const person = {
    id: 1,
    name: "Jenna",
    age: 23,
    city: "Los Angeles"
}

const json = JSON.stringify(person);
console.log(json);











