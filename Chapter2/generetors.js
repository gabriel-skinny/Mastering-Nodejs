
function *range(start = 1, end = 2) {
  do {
    yield start;
  } while(++start <= end);
}

const generator = range(1, 5);

let gen = generator.next();

while (!gen.done) {
  console.log(gen.value);
  gen = generator.next();
}


