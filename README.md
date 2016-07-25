# spn v3.7.0

[![Circle CI](https://circleci.com/gh/kt3k/spn.svg?style=svg)](https://circleci.com/gh/kt3k/spn)
[![codecov.io](https://codecov.io/github/kt3k/spn/coverage.svg?branch=master)](https://codecov.io/github/kt3k/spn?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> :space_invader: **SP**rite e**N**gine :space_invader:

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

$.cc('my-character', MyCharacter)
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
class MyCharacter extends spn.Sprite {
  ...
}

$.cc('my-character', MyCharacter)
</script>
```

# API

```js
var spn = require('spn')
```

## spn.wait(time)
## spn.reflow(elem)
## spn.LayoutFactory
## spn.Area
## spn.Rect
## spn.Rect
## spn.Body
## spn.Animation
## spn.Image

# Decorator APIs

## spn.ratio.x
## spn.ratio.y
## spn.animation.show
## spn.animation.hide
## spn.width
## spn.height
## spn.transition.duration
