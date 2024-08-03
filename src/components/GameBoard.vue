<template>
  <div class="game">
    <canvas ref="playfieldElement" :width="PLAYFIELD_WIDTH" :height="PLAYFIELD_HEIGHT"></canvas>
    <div class="display">
      <div ref="scoreElement"></div>
      <button ref="startElement">Start</button>
      <div ref="infoElement">Press play!</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { PlayField } from '@/types/PlayField'
import { Ball } from '@/types/Ball'
import { Brick } from '@/types/Brick'
import { Paddle } from '@/types/Paddle'
import useCollision from '@/composables/useCollision'
import useSprite from '@/composables/useSprite'

// Level and colors
import {
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from '@/init'

// Images
const PADDLE_IMAGE = './images/paddle.png'
const BALL_IMAGE = './images/ball.png'

const playfieldElement: Ref<HTMLCanvasElement | undefined> = ref<HTMLCanvasElement>()
const scoreElement = ref<HTMLDivElement | null>()
const startElement = ref()
const infoElement = ref<HTMLDivElement | null>()

let gameOver = false
let score = 0

const { isCollidingBricks, checkBallCollision } = useCollision()
const { createBricks } = useSprite()

function setGameOver(view: PlayField) {
  view.drawInfo('Game Over!')
  gameOver = true
}

function setGameWin(view: PlayField) {
  view.drawInfo('Game Won!')
  gameOver = false
}

function gameLoop(view: PlayField, bricks: Brick[], paddle: Paddle, ball: Ball) {
  view.clear()
  view.drawBricks(bricks)
  view.drawSprite(paddle)
  view.drawSprite(ball)

  // Move Ball
  ball.moveBall()

  // Move paddle and check so it won't exit the playfield
  if (
    (paddle.isMovingLeft && paddle.position.x > 0) ||
    (paddle.isMovingRight && paddle.position.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle()
  }

  checkBallCollision(ball, paddle, view)

  const collidingBrick = isCollidingBricks(ball, bricks)

  if (collidingBrick) {
    score += 1
    view.drawScore(score)
  }

  // Game over when ball leaves playfield
  if (ball.position.y > view.canvas.height) {
    gameOver = true
  }

  // If game won, set gameOver and display win
  if (bricks.length === 0) {
    return setGameWin(view)
  }

  // Return if gameover and don't run the requestAnimationFrame
  if (gameOver) {
    return setGameOver(view)
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball))
}

function startGame(view: PlayField) {
  // Reset displays
  score = 0
  view.drawInfo('')
  view.drawScore(0)

  // Create all bricks
  const bricks = createBricks()

  // Create a Ball
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY
    },
    BALL_IMAGE
  )

  // Create a Paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5
    },
    PADDLE_IMAGE
  )

  gameLoop(view, bricks, paddle, ball)
}

onMounted(() => {
  if (playfieldElement.value) {
    // Create a new view
    const view = new PlayField(
      playfieldElement.value,
      scoreElement.value,
      startElement.value,
      infoElement.value
    )
    view.initStartButton(startGame)
  }
})
</script>

<style scoped>
canvas {
  outline: black 3px solid;
}
</style>
