import type { Point } from '@/types/Point'

export class Paddle {
  private _spriteImg: HTMLImageElement = new Image()
  private _moveLeft: boolean
  private _moveRight: boolean

  constructor(
    private _speed: number,
    private _width: number,
    private _height: number,
    private _position: Point,
    image: string
  ) {
    this._speed = _speed
    this._width = _width
    this._height = _height
    this._position = _position
    this._moveLeft = false
    this._moveRight = false
    this._spriteImg.src = image

    // Event listener
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  // Getters
  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }

  get position(): Point {
    return this._position
  }

  get image(): HTMLImageElement {
    return this._spriteImg
  }

  get isMovingLeft(): boolean {
    return this._moveLeft
  }

  get isMovingRight(): boolean {
    return this._moveRight
  }

  movePaddle(): void {
    if (this._moveLeft) {
      this._position.x -= this._speed
    }

    if (this._moveRight) {
      this._position.x += this._speed
    }
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this._moveLeft = false
    }

    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this._moveRight = false
    }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this._moveLeft = true
    }

    if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this._moveRight = true
    }
  }
}
