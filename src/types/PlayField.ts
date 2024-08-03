import { Brick } from '@/types/Brick'
import { Paddle } from '@/types/Paddle'
import { Ball } from '@/types/Ball'

export class PlayField {
  _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D | null
  private _scoreDisplay: HTMLDivElement | null
  private _start: HTMLDivElement | null
  private _info: HTMLDivElement | null

  constructor(
    canvas: HTMLCanvasElement,
    score: HTMLDivElement | null,
    start: HTMLDivElement | null,
    info: HTMLDivElement | null
  ) {
    this._canvas = canvas
    this._context = this._canvas.getContext('2d')
    this._scoreDisplay = score
    this._start = start
    this._info = info
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  clear(): void {
    this._context?.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

  initStartButton(startFunction: (view: PlayField) => void): void {
    this._start?.addEventListener('click', () => startFunction(this))
  }

  drawScore(score: number): void {
    if (this._scoreDisplay) {
      this._scoreDisplay.innerHTML = score.toString()
    }
  }

  drawInfo(text: string): void {
    if (this._info) {
      this._info.innerHTML = text
    }
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
