
export const INTERVAL_SLICE_ERROR_TOO_MUCH_ARGUMENTS = {
  code: 10001,
  message: 'Too much arguments, could not slice'
}

export const INTERVAL_SLICE_ERROR_ONLY_WIDTH = {
  code: 10002,
  message: 'Only width is given, could not slice'
}

export const RECT_SLICE_ERROR_TOO_MUCH_ARGUMENTS_VERTICALLY = {
  code: 11001,
  message: 'Too much arguments (top, height, bottom) are given vertically, could not slice'
}

export const RECT_SLICE_ERROR_TOO_MUCH_ARGUMENTS_HORIZONTALLY = {
  code: 11002,
  message: 'Too much arguments (left, width, right) are given horizontally, could not slice'
}

export const RECT_SLICE_ERROR_ONLY_WIDTH = {
  code: 11003,
  message: 'Only width is given horizontally, left or right is required'
}

export const RECT_SLICE_ERROR_ONLY_HEIGHT = {
  code: 11004,
  message: 'Only height is given vertically, top or bottom is required'
}
