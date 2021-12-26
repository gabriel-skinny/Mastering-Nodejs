let number = 3;

function square() {
  return number * number;
}

square();

%OptimizeFunctionOnNextCall(square);

square();

// Run: node --allow-natives-syntax --trace_opt --trace_deopt v8Optimization.js