import { Habit } from '../../domain/habit/habit'
import { v4 as uuidv4 } from 'uuid'

export class HabitMother {
  private id = uuidv4()
  private userId = uuidv4()
  private name = 'name'
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
