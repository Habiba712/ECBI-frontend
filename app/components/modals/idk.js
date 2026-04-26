
// function printNumbers(n) {
//     if (n > 9) {
//         printNumbers(Math.floor(n / 10));
//     }
//     process.stdout.write(String(n % 10));
// }

// printNumbers(123);
// process.stdout.write("\n");

function factorial(n){
    if (n === 1) return 1;
    console.log(n);
    return n * factorial(n - 1);
}
 
console.log(factorial(5));