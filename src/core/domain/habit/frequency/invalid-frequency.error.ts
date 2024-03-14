import { BaseError } from '../../../error'

export class InvalidFrequencyError extends BaseError {
  private constructor(message: string) {
    super('invalid-frequency', message)
  }

  static withFrequencyAndDuration(type: string, duration: number) {
    return new InvalidFrequencyError(
      `Duration ${duration} is invalid for ${type} frequency`,
    )
  }

  static withFrequencyType(type: string) {
    return new InvalidFrequencyError(`Frequency type ${type} is invalid`)
  }
}
