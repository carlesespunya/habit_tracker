import { BaseError } from '../../../error'

export class InvalidReminderError extends BaseError {
  private constructor(message: string) {
    super('invalid-frequency', message)
  }

  static withHour(hour: number) {
    return new InvalidReminderError(
      `Reminder is invalid for ${hour} hour. The hour must be between 0 and 23.`,
    )
  }

  static withStatus() {
    return new InvalidReminderError(
      `The reminder status can only be active or inactive.`,
    )
  }
}
