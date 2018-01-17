import farewellDirective from './farewell'
export const farewellDirectivePlugin = {
  install (Vue, options) {
    Vue.directive('farewell', farewellDirective(options))
  }
}
export default farewellDirective
