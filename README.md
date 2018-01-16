![alt text](assets/logo.png "Demo GIF")
# vue-sticky-bubble
> A vue directive to know when a user is leaving the page

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![travis build](https://img.shields.io/travis/SahajR/pokemon-names-and-types.svg?style=flat-square)](https://travis-ci.org/SahajR/vue-farewell)
![alt text](assets/demo.gif "Demo GIF")

## Usage
Install via npm or yarn.
```
npm install vue-farewell
or
yarn add vue-farewell
```
Install it globally
```js
import Vue from 'vue'
import { farewellDirectivePlugin } from './lib'

Vue.use(farewellDirectivePlugin)
```
Then

```vue
<template>
  <div style="position: relative;">
    <div v-farewell="onLeave">Don't leave!</div>
  </div>
</template>

export default {
  name: 'app',
  methods: {
    onLeave () {
      console.log('Gone!')
    }
  }
}
```

## Modifiers

| modifier | Description |
| ------ | ------ |
| aggressive | Will fire every time the user tries to leave |
| flex | Will make the element display `flex` instead of `block` |


## License
```
The MIT License (MIT)

Copyright © 2018 SahajR

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
```
