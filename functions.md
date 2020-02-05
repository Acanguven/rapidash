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

max can perform 61,512,111 ops/sec with benchmark data below.

```js
r.max([1,2,3,4,5,6,1,3,5,7,2,8,9,32,4,8,4,4,5,7,56,1,5,8,4,4,6]);
```


___
## factorial

Calculates the factorial of a number.

### Examples
```js
r.factorial(6) // 720
```



> factorial function by <a href="https://github.com/acanguven">acanguven</a>  

factorial can perform 9,287,289 ops/sec with benchmark data below.

```js
r.factorial(14);
```


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

fibonacci can perform 67,655,377 ops/sec with benchmark data below.

```js
r.fibonacci(14);
```


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

average can perform 43,126,474 ops/sec with benchmark data below.

```js
r.average(1,2,3,0,73,53,23,54,23,74,3,42);
```


___
## primes

Generates primes up to a given number.

### Examples
```js
r.primes(10) // [2,3,5,7]
```



> primes function by <a href="https://github.com/acanguven">acanguven</a>  

primes can perform 30,961 ops/sec with benchmark data below.

```js
r.primes(150);
```


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

times can perform 35,678,265 ops/sec with benchmark data below.

```js
r.times([2,2],[100,{"hello":"world"}],[1000,{"hello":"world","nested":{"object":{"with":{"array":[]}}}}]);
```



