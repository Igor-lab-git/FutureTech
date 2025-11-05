
const str = "Начало строки и конец снова начало Строки и Конец";
const number = "+7 (908) 237-05-01"

console.log(str.split(" ").map(word => word[0].toUpperCase() ? word.toLowerCase() : word).join(" "));
console.log(str.slice(-6));




