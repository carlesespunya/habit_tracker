import { Reminder } from '../../domain/habit/reminder/Reminder'
import { v4 as uuidv4 } from 'uuid'

export class ReminderMother {
  private id = uuidv4()
  private hour = 1
  private message = 'message'
  private status = 'active'

  build(): Reminder {
    return Reminder.create(this.id, this.message, this.status, this.hour)
  }

  static create(): Reminder {
    return new ReminderMother().build()
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withHour(hour: number) {
    this.hour = hour
    return this
  }

  withStatus(status: string) {
    this.status = status
    return this
  }
}
