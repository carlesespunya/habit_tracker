import { InvalidChallengeError } from './invalid-challenge.error'

export class Challenge {
  private constructor(
    readonly id: string,
    readonly description: string,
    readonly goal: number,
    readonly startDate: Date,
    readonly endDate: Date,
  ) {}

  static create(
    id: string,
    description: string,
    goal: number,
    startDate: Date,
    endDate: Date,
  ): Challenge {
    if (startDate < new Date())
      throw InvalidChallengeError.withStartDate(startDate)

    if (startDate > endDate)
      throw InvalidChallengeError.withStartDateAndEndDate(startDate, endDate)

    if (goal <= 0) throw InvalidChallengeError.withGoal(goal)

    if (description.length < 30)
      throw InvalidChallengeError.withDescription(description)

    return new Challenge(id, description, goal, startDate, endDate)
  }
}
