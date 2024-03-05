import { Frequency } from './frequency'

export class Habit {
  private createdAt: Date
  private lastUpdatedAt: Date
  frequency: Frequency

  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    frequency: Frequency,
  ) {
    this.frequency = frequency
    this.createdAt = new Date()
    this.lastUpdatedAt = new Date()
  }

  static create(
    id: string,
    userId: string,
    name: string,
    frequencyType: string,
    estimatedTime: number,
    minRestTime: number,
  ): Habit {
    const frequencyObj = Frequency.create(
      estimatedTime,
      frequencyType,
      minRestTime,
    )

    return new Habit(id, userId, name, frequencyObj)
  }
}
