import { InvalidProgressError } from './invalid-progress.error'

export class Progress {
  private constructor(
    readonly id: string,
    readonly date: Date,
    readonly observations: string,
    readonly validated: boolean = false,
  ) {}

  static create(
    id: string,
    date: Date,
    observations: string,
    validated: boolean,
  ): Progress {
    if (date > new Date()) throw InvalidProgressError.withDate(date)

    return new Progress(id, date, observations, validated)
  }
}
