# spn v3.9.0

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
- Promise (es2015)

# Usage

Via npm

    npm install spn

```js
const {Body} = require('spn')

class MyCharacter extends Body {
    ...
}

$.cc('my-character', MyCharacter)
```

**NOTE:** You need to load $ (jquery) and class-component globally.

# API

```js
const spn = require('spn')
```

## spn.wait(time)

- @param {number} time The time to wait (in milliseconds)
- @return {Promise}

Returns the promise which resolves after the given milliseconds.

## spn.reflow(elem)

- @param {jQuer} elem The element

Reflows (repaints) the element.

## spn.Area
## spn.Rect
## spn.Body
## spn.Animation
## spn.Image

# Decorator APIs

## spn.ratio({x, y})
## spn.margin({x, y})
## spn.animation({show: [name, duration], hide: [name, duration]})
## spn.width(width)
## spn.height(height)
## spn.transition.duration(duration)
