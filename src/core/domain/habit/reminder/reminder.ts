import { InvalidReminderError } from './invalid-reminder.error'

export class Reminder {
  private constructor(
    readonly id: string,
    readonly message: string,
    readonly status: string,
    readonly hour: number,
  ) {}

  static create(
    id: string,
    message: string,
    status: string,
    hour: number,
  ): Reminder {
    if (status !== 'active' && status !== 'inactive') {
      throw InvalidReminderError.withStatus()
    }

    if (hour < 0 || hour > 23) {
      throw InvalidReminderError.withHour(hour)
    }

    return new Reminder(id, message, status, hour)
  }
}
