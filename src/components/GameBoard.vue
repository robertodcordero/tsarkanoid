<template>
  <div class="game">
    <canvas ref="playfield" :width="PLAYFIELD_WIDTH" :height="PLAYFIELD_HEIGHT"></canvas>
    <div class="info">
      <div class="score">{{ score }}</div>
      <button class="btn btn-primary" @click="initGame">Start</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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

const playfield: Ref<HTMLCanvasElement | undefined> = ref<HTMLCanvasElement>()

let stopGame = false
let isGameRunning = false
let gameOver = false
let paused = ref(false)
let score = ref(0)

const { isCollidingBricks, checkBallCollision } = useCollision()
const { createBricks } = useSprite()

function setGameOver(view: PlayField) {
  view.drawGameOver()
  gameOver = true
}

function setGameWin(view: PlayField) {
  view.drawGameWin()
  gameOver = false
}

function gameLoop(view: PlayField, bricks: Brick[], paddle: Paddle, ball: Ball) {
  if (stopGame) {
    isGameRunning = false
    return
  }

  if (paused.value) {
    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball))
  }

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
    score.value += 1
    playHitSound()
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
  isGameRunning = true
  // Reset displays
  score.value = 0
  gameOver = false

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

const initGame = () => {
  let waitCycle = 1
  while (isGameRunning && waitCycle < 10000) {
    stopGame = true
    waitCycle++
  }

  setTimeout(() => {
    stopGame = false

    if (playfield.value) {
      const view = new PlayField(playfield.value)
      startGame(view)
    }
  }, 300)
}

const handleKeyUp = (e: KeyboardEvent): void => {
  if (e.code === 'Space' || e.key === ' ') {
    paused.value = !paused.value
  }
}

const playHitSound = () => {
  const audio = new Audio('./audios/hit.mp3')
  audio.play()
}

document.addEventListener('keyup', handleKeyUp)
</script>

<style scoped>
.info {
  @apply flex flex-nowrap flex-row justify-between items-center pt-4 pb-4;
}
</style>
