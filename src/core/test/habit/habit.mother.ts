import { Habit } from '../../domain/habit/habit'
import { v4 as uuidv4 } from 'uuid'

export class HabitMother {
  private id = uuidv4()
  private userId = uuidv4()
  private name = 'name'
  private frequencyType = 'daily'
  private estimatedTime = 1
  private minRestTime = 1
  private wearableDeviceId = null

  build(): Habit {
    return Habit.create(
      this.id,
      this.userId,
      this.name,
      this.frequencyType,
      this.estimatedTime,
      this.minRestTime,
      this.wearableDeviceId,
    )
  }

  static create(): Habit {
    return new HabitMother().build()
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withWearableDeviceId(wearableDeviceId: string) {
    this.wearableDeviceId = wearableDeviceId
    return this
  }
}
