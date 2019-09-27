  // hacks because web don't have npm:
  const module = {}
  const require = (module) => {
    return {
      'random-item': (arr) => arr[Math.floor(Math.random() * arr.length)],
      'replace-string': (string, needle, replacement, options) => {
        // npmjs.com/package/replace-string
        if (typeof string !== 'string') {
          throw new TypeError(`Expected input to be a string, got ${typeof string}`)
        }

        if (!(typeof needle === 'string' && needle.length > 0) ||
              !(typeof replacement === 'string' || typeof replacement === 'function')) {
          return string
        }

        let result = ''
        let matchCount = 0
        let prevIndex =  0

        if (prevIndex > string.length) {
          return string
        }

        while (true) { // eslint-disable-line no-constant-condition
          const index = string.indexOf(needle, prevIndex)

          if (index === -1) {
            break
          }

          matchCount++

          const replaceStr = typeof replacement === 'string' ? replacement : replacement(needle, matchCount, string, index)

              // Get the initial part of the string on the first iteration
          const beginSlice = matchCount === 1 ? 0 : prevIndex

          result += string.slice(beginSlice, index) + replaceStr

          prevIndex = index + needle.length
        }

        if (matchCount === 0) {
          return string
        }

        return result + string.slice(prevIndex)
      }
    }[module]
  }
