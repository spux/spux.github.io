// IMPORTS
console.log('window.location.href', window.location.href)

let shimScript =
  './' +
  window.location.href.replace('.html', '').concat('.js')

import(shimScript)
