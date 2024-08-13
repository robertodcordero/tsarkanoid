import type { Ball } from '@/types/Ball'
import type { Brick } from '@/types/Brick'
import type { Paddle } from '@/types/Paddle'
import type { PlayField } from '@/types/PlayField'

export default function useCollision() {
  function isCollidingBrick(ball: Ball, brick: Brick): boolean {
    return (
      ball.position.x < brick.position.x + brick.width &&
      ball.position.x + ball.width > brick.position.x &&
      ball.position.y < brick.position.y + brick.height &&
      ball.position.y + ball.height > brick.position.y
    )
  }

  function isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false

    bricks.forEach((brick, i) => {
      if (isCollidingBrick(ball, brick)) {
        ball.changeYDirection()
        if (brick.energy === 1) {
          bricks.splice(i, 1)
        } else {
          brick.energy -= 1
        }
        colliding = true
      }
    })

    return colliding
  }

  function checkBallCollision(ball: Ball, paddle: Paddle, view: PlayField): void {
    // Check paddle
    if (
      ball.position.x + ball.width > paddle.position.x &&
      ball.position.x < paddle.position.x + paddle.width &&
      ball.position.y + ball.height === paddle.position.y
    ) {
      ball.changeYDirection()
      playHitPaddleSound()
    }

    // Check fieldset
    if (ball.position.x > view.canvas.width - ball.width || ball.position.x < 0) {
      ball.changeXDirection()
      playHitWallSound()
    }

    //
    if (ball.position.y < 0) {
      ball.changeYDirection()
      playHitWallSound()
    }
  }

  const playHitWallSound = () => {
    const audio = new Audio('./audios/hit-wall.mp3')
    audio.play()
  }

  const playHitPaddleSound = () => {
    const audio = new Audio('./audios/hit-paddle.mp3')
    audio.play()
  }

  return { isCollidingBricks, checkBallCollision }
}
