// IMPORTS
let shimScript =
  './' +
  window.location.href
    .split('/')
    .pop()
    .replace('.html', '')
    .concat('.js')

import(shimScript)
