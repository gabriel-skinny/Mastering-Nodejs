const EventEmitter = require('events').EventEmitter;

class Counter extends EventEmitter  {
  constructor(i) {
    super();
    this.i = i;
  }

  increment() {
    this.i++;
    this.emit("incremented", this.i);
  }
}

const counter = new Counter(6); 

const callback = function (n) {
  console.log(n);
}

counter.on("incremented", callback);

counter.increment();
counter.increment();