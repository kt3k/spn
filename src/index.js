exports.wait = require('./wait')
exports.reflow = require('./reflow')
exports.ifNumElse = require('./if-num-else')

exports.Animation = require('./animation')
exports.Area = require('./area')
exports.Being = require('./being')
exports.Body = require('./body')
exports.DirStateImageMap = require('./dir-state-image-map')
exports.DIRS = require('./const/dirs')
exports.Grid = require('./grid')
exports.GridWalker = require('./grid-walker')
exports.Image = require('./image')
exports.Interval = require('./interval')
exports.LayoutFactory = require('./layout-factory')
exports.Point = require('./point')
exports.Posture = require('./posture')
exports.Prebody = require('./prebody')
exports.Rect = require('./rect')


const decorators = require('./decorators')
exports.decorators = decorators
Object.keys(decorators).forEach(key => { exports[key] = exports.decorators[key] })
