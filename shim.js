// IMPORTS
console.log('window.location.href', window.location.href)

let shimScript =
  './' +
  window.location.href
    .split('/')
    .pop()
    .replace('.html', '')
    .concat('.js')

import(shimScript)
