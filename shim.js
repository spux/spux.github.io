// IMPORTS
let shimScript =
  './' +
  window.location.pathname
    .split('/')
    .pop()
    .replace('.html', '')
    .concat('.js')

import(shimScript)

