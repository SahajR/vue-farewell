<template>
  <div id="app">
    <div class="message">I know this site is boring, but please stay here for a while...</div>
    <div v-farewell.flex="onLeave" class="modal">
      <div class="modal-content">
        <span style="message">Noooooo...!</span>
        <div>Please don't leave!!</div>
        <img src="./assets/logo.png">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { farewellDirectivePlugin } from './lib'

Vue.use(farewellDirectivePlugin)

export default {
  name: 'app',
  methods: {
    onLeave () {
      console.log('Gone!')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.modal {
  display: none;
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 9999;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 50px;
  height: 300px;
  width: 500px;
}
.message {
  font-size: 3em;
  font-style: bold;
}
</style>
