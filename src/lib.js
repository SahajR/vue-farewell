import farewellDirective from './farewell'
export const farewellDirectivePlugin = {
  install (Vue) {
    Vue.directive('farewell', farewellDirective)
  }
}
export default farewellDirective
