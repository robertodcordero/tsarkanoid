import { Brick } from '@/types/Brick'
import { Paddle } from '@/types/Paddle'
import { Ball } from '@/types/Ball'

export class PlayField {
  _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._context = this._canvas.getContext('2d')
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  clear(): void {
    this._context?.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

  drawSprite(sprite: Brick | Paddle | Ball): void {
    if (!sprite) {
      return
    }

    this._context?.drawImage(
      sprite.image,
      sprite.position.x,
      sprite.position.y,
      sprite.width,
      sprite.height
    )
  }

  drawBricks(bricks: Brick[]): void {
    bricks.forEach((brick) => this.drawSprite(brick))
  }

  _drawGameResultText(status: string, textColor: 'red' | 'blue') {
    if (this._context) {
      this._context.font = '42px Arial'
      if (this._canvas) {
        this._context.textAlign = 'center'
        this._context.strokeStyle = 'black'
        this._context.strokeText(status, this._canvas.width / 2, (7 * this._canvas.height) / 8)
        this._context.fillStyle = textColor
        this._context.fillText(status, this._canvas.width / 2, (7 * this._canvas.height) / 8)
      }
    }
  }

  drawGameOver(): void {
    this._drawGameResultText('Game Over', 'red')
  }

  drawGameWin(): void {
    this._drawGameResultText('Game Win!!!', 'blue')
  }
}
