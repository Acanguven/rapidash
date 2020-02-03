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

max can perform 63,420,513 ops/sec with benchmark data below.

```js
r.max(1,2,3,4,5,6,1,3,5,7,2,8,9,32,4,8,4,4,5,7,56,1,5,8,4,4,6);
```


___
## factorial

Calculates the factorial of a number.

### Examples
```js
r.factorial(6) // 720
```



> factorial function by <a href="https://github.com/acanguven">acanguven</a>  

factorial can perform 9,378,244 ops/sec with benchmark data below.

```js
r.factorial(14);
```



