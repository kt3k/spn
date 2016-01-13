import $ from 'jquery'
import {polyfill} from 'es6-promise'

global.$ = global.jQuery = $
polyfill()
