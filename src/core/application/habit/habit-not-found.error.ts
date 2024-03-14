import { BaseError } from '../../error'

export class HabitNotFoundError extends BaseError {
  private constructor(message: string) {
    super('habit-not-found', message)
  }

  static withId(habitId: string): HabitNotFoundError {
    return new HabitNotFoundError(`Habit with id ${habitId} not found`)
  }
}
