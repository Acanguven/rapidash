<p align="center">
  <img src="https://github.com/Acanguven/rapidash/raw/master/logo.png">
</p>

# Rapidash
[![CircleCI](https://circleci.com/gh/Acanguven/rapidash/tree/master.svg?style=svg&circle-token=cc706fdf77382859bca066d69dd4003b42251653)](https://circleci.com/gh/Acanguven/rapidash/tree/master) [![npm version](https://badge.fury.io/js/rapidash.svg)](https://badge.fury.io/js/rapidash) [![codecov](https://codecov.io/gh/Acanguven/rapidash/branch/master/graph/badge.svg?token=RWcvIRl77k)](https://codecov.io/gh/Acanguven/rapidash)

Follow [Documentation](https://rapidashjs.com) for more information about Rapidash!

## What is Rapidash?
Rapidash is a Javascript utility library designed for performance, modularity, and reliability. Unlike other utility libraries, Rapidash designed from the ground up to be fast all the time against all Javascript engine versions. Also being open-source friendly, it is evolving faster than any other utility library.


## Install 
- npm
```bash
npm install rapidash
```

- yarn
```bash
yarn add rapidash
```


## Usage
```js
const r = require('rapidash');
console.log(r.max([1,2,3])); // 3
```



## How it works?
1. A new problem released on Rapidash.
2. Contributors submit solutions.
3. The new solution is tested automatically and if it is valid it gets added to the solution list.
3. Rapidash automatically picks the fastest solution on each build so each version shipped with the fastest solutions all the time.
4. Other solutions are removed from the bundle to reduce bundle size automatically.
