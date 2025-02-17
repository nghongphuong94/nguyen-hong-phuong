// Use loop
var sum_to_n_a = function(n) {
  if (n === 0) {
    return 0;
  }

  let result = 0;
  for (let i = 1; i <= n; i += 1) {
    result += i;
  }
  return result;
};

// Use formula
var sum_to_n_b = function(n) {
  return n * (n + 1) / 2;
};

// Use recursion
var sum_to_n_c = function(n) {
  if (n === 0) {
    return 0;
  }

  return sum_to_n_c(n - 1) + n;
};

const n = 1000;

console.log('sum_to_n_a', sum_to_n_a(n));
console.log('sum_to_n_b', sum_to_n_b(n));
console.log('sum_to_n_c', sum_to_n_c(n));
