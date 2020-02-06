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

max can perform approximately 47,251,995 ops/sec.

___
## factorial

Calculates the factorial of a number.

### Examples
```js
r.factorial(6) // 720
```



> factorial function by <a href="https://github.com/yavuzkoca">yavuzkoca</a>  

factorial can perform approximately 39,883,067 ops/sec.

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



> fibonacci function by <a href="https://github.com/Emre-Kul">Emre-Kul</a>  

fibonacci can perform approximately 20,709,644 ops/sec.

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

average can perform approximately 21,715,502 ops/sec.

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

isPalindrome can perform approximately 12,573,986 ops/sec.

___
## primes

Generates primes up to a given number.

### Examples
```js
r.primes(10) // [2,3,5,7]
```



> primes function by <a href="https://github.com/acanguven">acanguven</a>  

primes can perform approximately 23,703 ops/sec.

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

times can perform approximately 8,203,085 ops/sec.

___
## equal

compare two object is equal.

### Examples
```js
r.equal([], []) // true
```
 ```js
r.equal({}, {}) // true
```
 ```js
r.equal(NaN, NaN) // true
```



> equal function by <a href="https://github.com/cagataycali">cagataycali</a>  

equal can perform approximately 43,220,448 ops/sec.

___
## isString

checks the input is string

### Examples
```js
r.isString("") // true
```
 ```js
r.isString({}) // false
```
 ```js
r.isString(NaN) // false
```
 ```js
r.isString(2) // false
```
 ```js
r.isString([]) // false
```
 ```js
r.isString(undefined) // false
```



> isString function by <a href="https://github.com/cagataycali">cagataycali</a>  

isString can perform approximately 65,448,669 ops/sec.

___
## flatten

Flattens given array according to given depth.

### Examples
```js
r.flatten([2, 3, [4, [6]]], 1) // [2, 3, 4, [6]]
```
 ```js
r.flatten([2, 3, [4, [6]]], 2) // [2, 3, 4, 6]
```



> flatten function by <a href="https://github.com/mehmetsefabalik">mehmetsefabalik</a>  

flatten can perform approximately 6,711,145 ops/sec.


