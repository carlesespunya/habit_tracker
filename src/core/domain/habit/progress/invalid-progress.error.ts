import { BaseError } from '../../../error'

export class InvalidProgressError extends BaseError {
  private constructor(message: string) {
    super('invalid-frequency', message)
  }

  static withDate(date: Date) {
    return new InvalidProgressError(
      `Progress is invalid for ${date} date. You can only create progess in the past.`,
    )
  }
}
