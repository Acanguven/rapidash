# Functions

<style>
    h2  {
        text-transform: capitalize;
    }
</style>

<p class="tip">
All examples assume that you required Rapidash
</p>

```js
const r = require('rapidashjs');
```

___
## max

Computes the maximum value of array. If array is empty or falsey, undefined is returned.

### Examples
```js
r.max([1,2,3]) // 3
```
 ```js
r.max() // undefined
```
 ```js
r.max([]) // undefined
```



> max function by <a href="https://github.com/acanguven">acanguven</a>  

max can perform approximately 64,365,090 ops/sec.

___
## factorial

Calculates the factorial of a number.

### Examples
```js
r.factorial(6) // 720
```



> factorial function by <a href="https://github.com/yavuzkoca">yavuzkoca</a>  

factorial can perform approximately 44,558,317 ops/sec.

___
## fibonacci

Calculates the fibonacci number with given index.

### Examples
```js
r.fibonacci(1) // 1
```
 ```js
r.fibonacci(3) // 3
```
 ```js
r.fibonacci(20) // 6765
```



> fibonacci function by <a href="https://github.com/yavuzkoca">yavuzkoca</a>  

fibonacci can perform approximately 22,919,007 ops/sec.

___
## average

Returns the average of two or more numbers.

### Examples
```js
r.average() // NaN
```
 ```js
r.average(1) // 1
```
 ```js
r.average(1,2) // 1.5
```
 ```js
r.average(1,2,3) // 2
```
 ```js
r.average(1,2,3,0) // 1.5
```



> average function by <a href="https://github.com/acanguven">acanguven</a>  

average can perform approximately 27,256,503 ops/sec.

___
## isPalindrome

Returns true if given word is palindrome. Otherwise, false

### Examples
```js
r.isPalindrome("") // true
```
 ```js
r.isPalindrome("a") // true
```
 ```js
r.isPalindrome("aa") // true
```
 ```js
r.isPalindrome("aab") // false
```
 ```js
r.isPalindrome("aaaaa") // true
```
 ```js
r.isPalindrome("aaaaabaaa") // false
```



> isPalindrome function by <a href="https://github.com/yavuzkoca">yavuzkoca</a>  

isPalindrome can perform approximately 15,346,943 ops/sec.

___
## primes

Generates primes up to a given number.

### Examples
```js
r.primes(10) // [2,3,5,7]
```



> primes function by <a href="https://github.com/acanguven">acanguven</a>  

primes can perform approximately 32,412 ops/sec.

___
## times

times receives as arguments the number of iterations and a function to execute n times and returns an array of the results. Very useful when creating dynamic test data.

### Examples
```js
r.times(2, null) // [null, null]
```
 ```js
r.times() // []
```
 ```js
r.times(2) // [undefined, undefined]
```
 ```js
r.times(2, 2) // [2, 2]
```



> times function by <a href="https://github.com/cagataycali">cagataycali</a>  

times can perform approximately 4,702,167 ops/sec.


