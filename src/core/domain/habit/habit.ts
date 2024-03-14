import { Frequency } from './frequency/frequency'
import { Progress } from './progress/progress'

export class Habit {
  private createdAt: Date
  private lastUpdatedAt: Date
  frequency: Frequency
  progress: Progress[] = []

  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    frequency: Frequency,
    readonly wearableDeviceId?: string,
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
    wearableDeviceId?: string,
  ): Habit {
    const frequencyObj = Frequency.create(
      estimatedTime,
      frequencyType,
      minRestTime,
    )

    return new Habit(id, userId, name, frequencyObj, wearableDeviceId)
  }

  createProgress(
    id: string,
    date: Date,
    observations: string,
    validated: boolean,
  ) {
    const progress = Progress.create(id, date, observations, validated)

    this.progress.push(progress)
  }
}
