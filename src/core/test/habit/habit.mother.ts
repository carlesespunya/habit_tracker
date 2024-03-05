import { Habit } from '../../domain/habit/habit'

export class HabitMother {
  private id = 'id'
  private userId = 'userId'
  private name = 'name'
  private frequency = 1
  private frequencyType = 'daily'
  private estimatedTime = 1
  private minRestTime = 1

  build(): Habit {
    return Habit.create(
      this.id,
      this.userId,
      this.name,
      this.frequencyType,
      this.estimatedTime,
      this.minRestTime,
    )
  }

  static create(): Habit {
    return new HabitMother().build()
  }

  withId(id: string) {
    this.id = id
    return this
  }
}
