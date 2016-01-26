# spn v0.4.1 (WIP)

> **SP**rite e**N**gine

# What's this?

`spn` is a library for handling lots of dom elements effectively on a page which are layouted `absolute`ly.

## The responsibities of `spn`

- Dom layout in `position: aboslute` context
- Handle multiple display sizes
- Change image according to the current state of component

## What `spn` doesn't do

- Dom layout in `position: relative` context
- Handle canvas
- Handle game progress (Not a game engine)

## Supposed usecases

- Puzzle Game
- Action Game
- Role Playing Game
- Game in general

## Dependencies

- jQuery
- class-component
- cc-event
- Promise (es6)

# Usage

Via npm

    npm install spn

```js
import {Sprite} from 'spn'

class MyCharacter extends Sprite {
    ...
}

$.cc.assign('my-character', MyCharacter)
```

**NOTE:** You need to load $ (jquery) and class-component globally.

Via file:

First download spn.min.js, then

```html
<div class="my-character"></div>

<script src="path/to/jquery.min.js"></script>
<script src="path/to/class-component.min.js"></script>
<script src="path/to/spn.min.js"></script>
<script>

var MyCharacter = $.cc.subclass(spn.Sprite, function (pt) {
    'use strict'

    ...
})

$.cc.register('my-character', MyCharacter)
</script>
```

# API

```js
var spn = require('spn')
```

## spn.wait(time)
## spn.Dimension
## spn.DimensionFactory
## spn.Rect
## spn.Grid
## spn.GridWalker
## spn.Animation
## spn.Image
## spn.Sprite
## spn.CharSprite
## spn.StaticSprite
