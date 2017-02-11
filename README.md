# spn v5.6.2

[![Circle CI](https://circleci.com/gh/kt3k/spn.svg?style=svg)](https://circleci.com/gh/kt3k/spn)
[![codecov.io](https://codecov.io/github/kt3k/spn/coverage.svg?branch=master)](https://codecov.io/github/kt3k/spn?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> :space_invader: **SP**rite e**N**gine :space_invader:

# What's this?

`spn` is a library for handling absolutely positioned elements effectively.

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
- capsid
- Promise

# Usage

Via npm

    npm install spn

```js
const { Body } = require('spn')
const { component } = require('capsid')

@component
class MyCharacter extends Body {
    ...
}
```

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

# Traits

## spn.being
## spn.body

# Decorator APIs

## spn.ratio({x, y})
## spn.margin({x, y, left, right, top, bottom})
## spn.animation({show: [name, duration], hide: [name, duration]})
## spn.width(width)
## spn.height(height)
## spn.transition.duration(duration)

# History

- v3.10.0   2016-09-16   Added @margin() and @ratio() decorators.

# License

MIT
