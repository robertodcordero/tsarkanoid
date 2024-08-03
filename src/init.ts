export const RED_BRICK_IMAGE = './images/brick-red.png'
export const BLUE_BRICK_IMAGE = './images/brick-blue.png'
export const GREEN_BRICK_IMAGE = './images/brick-green.png'
export const YELLOW_BRICK_IMAGE = './images/brick-yellow.png'
export const PURPLE_BRICK_IMAGE = './images/brick-purple.png'

// Constants
export const PLAYFIELD_WIDTH = 500
export const PLAYFIELD_HEIGHT = 1000
export const STAGE_PADDING = 10
export const STAGE_ROWS = 20
export const STAGE_COLS = 10
export const BRICK_PADDING = 5
export const BRICK_WIDTH =
  Math.floor((PLAYFIELD_WIDTH - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING
export const BRICK_HEIGHT =
  Math.floor((PLAYFIELD_HEIGHT - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING
export const PADDLE_WIDTH = 150
export const PADDLE_HEIGHT = 25
export const PADDLE_STARTX = 450
export const PADDLE_SPEED = 10
export const BALL_SPEED = 5
export const BALL_SIZE = 20
export const BALL_STARTX = 500
export const BALL_STARTY = 400

export const BRICK_IMAGES: { [key: number]: string } = {
  1: RED_BRICK_IMAGE,
  2: GREEN_BRICK_IMAGE,
  3: YELLOW_BRICK_IMAGE,
  4: BLUE_BRICK_IMAGE,
  5: PURPLE_BRICK_IMAGE
}

export const BRICK_ENERGY: { [key: number]: number } = {
  1: 1, // Red brick
  2: 1, // Green brick
  3: 2, // Yellow brick
  4: 2, // Blue brick
  5: 3 // Purple brick
}

// prettier-ignore
export const LEVEL = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
  0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 
  0, 0, 5, 5, 0, 0, 5, 5, 0, 0,
];
