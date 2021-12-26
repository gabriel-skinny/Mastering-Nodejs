

let interval = setInterval(() => {
  console.log("Running!!");
}, 1000);

setTimeout(() => {
  interval.unref();
}, 2000);
