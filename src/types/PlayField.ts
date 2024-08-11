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
}
