const user = {
  id: 1,
  name: "John",
  age: 25,
};

console.log(user);

console.log("start");

setTimeout(() => {
  console.log("timer-1");
  setTimeout(() => {
    console.log();
    console.log("timer-2");
  }, 2000);
}, 3000);

setTimeout(() => {
  console.log("timer-3");
}, 5000);

console.log("end");

