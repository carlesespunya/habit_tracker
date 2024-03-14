import { BaseError } from '../../../error'

export class InvalidChallengeError extends BaseError {
  private constructor(message: string) {
    super('invalid-challenge', message)
  }

  static withStartDateAndEndDate(startDate: Date, endDate: Date) {
    return new InvalidChallengeError(
      `Start date ${startDate} must be before ${endDate}`,
    )
  }

  static withStartDate(startDate: Date) {
    return new InvalidChallengeError(
      `Start date ${startDate} must be in the future`,
    )
  }

  static withStartDateEndDateAndGoal(
    startDate: Date,
    endDate: Date,
    goal: number,
  ) {
    return new InvalidChallengeError(
      `The goal: ${goal} can't be achived between ${startDate} and ${endDate} `,
    )
  }

  static withGoal(goal: number) {
    return new InvalidChallengeError(`The goal: ${goal} is invalid`)
  }

  static withDescription(description: string) {
    return new InvalidChallengeError(
      `The description: ${description} is to short, it must have at least 30 characters`,
    )
  }
}
