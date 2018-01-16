export default {
  bind (el, binding) {
    if (typeof document === 'undefined' || !el) {
      return
    }

    const FIRED_ONCE_KEY = 'fired_once'
    const html = document.documentElement
    const isAggressive = binding.modifiers.aggressive
    const delay = 0
    const sensitivity = 20
    let timer = null
    let disableKeydown = false

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
    const isDisabled = () => checkCookieValue(FIRED_ONCE_KEY, 'true') && !isAggressive

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
      document.cookie = FIRED_ONCE_KEY + '=true'
      html.removeEventListener('mouseleave', handleMouseLeave)
      html.removeEventListener('mouseenter', handleMouseEnter)
      html.removeEventListener('keydown', handleKeyDown)
    }

    const fire = () => {
      if (isDisabled()) { return }
      if (el) { el.style.display = binding.modifiers.flex ? 'flex' : 'block' }
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
}
