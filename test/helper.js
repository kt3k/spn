global.$ = global.jQuery = require('jquery')
const capsid = require('capsid')
require('capsid/jquery')(capsid, $)
require('es6-promise').polyfill()
