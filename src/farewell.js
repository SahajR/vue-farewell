export default (options = {}) => ({
  bind (el, binding) {
    if (typeof document === 'undefined' || !el) {
      return
    }

    const getDefaultElementDisplayStyle = () => {
      const displayStyles = ['inline', 'block', 'flex', 'inline-block', 'inline-flex', 'inline-table', 'list-item', 'run-in',
        'table', 'inherit', 'initial', 'table-row', 'table-column', 'table-cell', 'table-row-group', 'table-column-group',
        'table-header-group', 'table-footer-group', 'table-caption']
      return displayStyles.indexOf(options.elementDisplayStyleOnFire) === -1 ? 'block' : options.elementDisplayStyleOnFire
    }

    if (options.elementHiddenByDefault === true) {
      el.style.display = 'none'
    }

    const asNumber = (value, defaultValue) => {
      if (typeof value === 'undefined') return defaultValue
      return isNaN(Number(value)) ? defaultValue : value
    }

    const setDefaultCookieExpire = (days) => {
      var ms = asNumber(days, 7) * 24 * 60 * 60 * 1000
      var date = new Date()
      date.setTime(date.getTime() + ms)
      return `; expires=${date.toUTCString()}`
    }

    const FIRED_ONCE_KEY = 'fired_once'
    const html = document.documentElement
    const isAggressive = options.aggressive === true
    const delay = asNumber(options.delay, 0)
    const sensitivity = asNumber(options.sensitivity, 20)
    let timer = null
    let disableKeydown = false
    let cookieExpire = setDefaultCookieExpire(options.cookieExpire) || ''
    let cookieDomain = options.cookieDomain ? ';domain=' + options.cookieDomain : ''
    let cookieName = options.cookieName ? options.cookieName : FIRED_ONCE_KEY
    let sitewide = options.sitewide === true ? ';path=/' : ''

    // Cookie helpers
    const parseCookies = () => {
      const cookies = document.cookie.split('; ')
      const res = {}
      for (var i = cookies.length - 1; i >= 0; i--) {
        var el = cookies[i].split('=')
        res[el[0]] = el[1]
      }
      return res
    }

    const checkCookieValue = (name, value) => parseCookies()[name] === value

    // Methods
    const isDisabled = () => checkCookieValue(cookieName, 'true') && !isAggressive

    const handleMouseLeave = (e) => {
      if (e.clientY > sensitivity) { return }
      timer = setTimeout(fire, delay)
    }

    const handleMouseEnter = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    const handleKeyDown = (e) => {
      if (disableKeydown) {
        return
      } else if (!e.metaKey || e.keyCode !== 76) { return }
      disableKeydown = true
      timer = setTimeout(fire, delay)
    }

    const disable = () => {
      if (typeof options.cookieExpire !== 'undefined') {
        cookieExpire = setDefaultCookieExpire(options.cookieExpire)
      }

      if (options.sitewide === true) {
        sitewide = ';path=/'
      }

      if (typeof options.cookieDomain !== 'undefined') {
        cookieDomain = ';domain=' + options.cookieDomain
      }

      if (typeof options.cookieName !== 'undefined') {
        cookieName = options.cookieName
      }

      document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide
      html.removeEventListener('mouseleave', handleMouseLeave)
      html.removeEventListener('mouseenter', handleMouseEnter)
      html.removeEventListener('keydown', handleKeyDown)
    }

    const fire = () => {
      if (isDisabled()) { return }
      if (el) { el.style.display = getDefaultElementDisplayStyle() }
      if (typeof binding.value === 'function') {
        binding.value()
      }
      disable()
    }

    const attachExitListener = () => {
      if (isDisabled()) {
        return
      }
      html.addEventListener('mouseleave', handleMouseLeave)
      html.addEventListener('mouseenter', handleMouseEnter)
      html.addEventListener('keydown', handleKeyDown)
    }

    attachExitListener()

    el.$destroy = () => { disable() }
  },
  unbind (el) {
    el.$destroy()
  }
})
