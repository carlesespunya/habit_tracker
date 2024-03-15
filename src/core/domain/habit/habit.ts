import { Challenge } from './challenge/challenge'
import { InvalidChallengeError } from './challenge/invalid-challenge.error'
import { Frequency } from './frequency/frequency'
import { Progress } from './progress/progress'
import { InvalidReminderError } from './reminder/invalid-reminder.error'
import { Reminder } from './reminder/reminder'

export class Habit {
  private createdAt: Date
  private lastUpdatedAt: Date
  frequency: Frequency
  progress: Progress[] = []
  challenges: Challenge[] = []
  reminders: Reminder[] = []

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

  createChallenge(
    id: string,
    description: string,
    goal: number,
    startDate: Date,
    endDate: Date,
  ) {
    this.validatePossibleChallenge(startDate, endDate, goal)

    const challenge = Challenge.create(
      id,
      description,
      goal,
      startDate,
      endDate,
    )

    this.challenges.push(challenge)
  }

  addReminder(id: string, message: string, status: string, hour: number) {
    if (this.reminders.some((reminder) => reminder.hour === hour))
      throw InvalidReminderError.repeatedFroHabit(this.id)

    if (this.reminders.length === 3)
      throw InvalidReminderError.maxRemindersForHabitId(this.id)

    const reminder = Reminder.create(id, message, status, hour)

    this.reminders.push(reminder)
  }

  private validatePossibleChallenge(
    startDate: Date,
    endDate: Date,
    goal: number,
  ) {
    if (this.frequency.minDateForGoal(startDate, goal) > endDate)
      throw InvalidChallengeError.withStartDateEndDateAndGoal(
        startDate,
        endDate,
        goal,
      )
  }
}
