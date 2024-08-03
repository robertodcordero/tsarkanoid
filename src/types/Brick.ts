import type { Point } from '@/types/Point'

export class Brick {
  private _spriteImg: HTMLImageElement = new Image()

  constructor(
    private _width: number,
    private _height: number,
    private _position: Point,
    private _energy: number,
    sprite: string
  ) {
    this._width = _width
    this._height = _height
    this._position = _position
    this._energy = _energy
    this._spriteImg.src = sprite
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

  get energy(): number {
    return this._energy
  }

  // Setters
  set energy(energy: number) {
    this._energy = energy
  }
}
