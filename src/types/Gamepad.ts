export class Gamepad {
  private _subscriptions: Array<(e: KeyboardEvent) => void>

  constructor() {
    // Event listener
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)

    this._subscriptions = new Array()
  }

  subscribe(eventHandler: (e: KeyboardEvent) => void) {
    this._subscriptions.push(eventHandler)
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (this._subscriptions && this._subscriptions.length > 0) {
      this._subscriptions.forEach((s) => s(e))
    }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    if (this._subscriptions && this._subscriptions.length > 0) {
      this._subscriptions.forEach((s) => s(e))
    }
  }

  destroy = (): void => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }
}
