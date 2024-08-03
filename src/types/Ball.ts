import type { Point } from '@/types/Point'
import type { Vector } from '@/types/Vector'

export class Ball {
  private _speed: Vector
  private _spriteImg: HTMLImageElement = new Image()

  constructor(
    speed: number,
    private _size: number,
    private _position: Point,
    image: string
  ) {
    this._size = _size
    this._position = _position
    this._speed = {
      x: speed,
      y: -speed
    }
    this._spriteImg.src = image
  }

  // Getters
  get width(): number {
    return this._size
  }

  get height(): number {
    return this._size
  }

  get position(): Point {
    return this._position
  }

  get image(): HTMLImageElement {
    return this._spriteImg
  }

  //Methods
  changeYDirection(): void {
    this._speed.y = -this._speed.y
  }

  changeXDirection(): void {
    this._speed.x = -this._speed.x
  }

  moveBall(): void {
    this.position.x += this._speed.x
    this.position.y += this._speed.y
  }
}
