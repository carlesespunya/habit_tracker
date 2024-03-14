import { Challenge } from '../../domain/habit/challenge/challenge'
import { v4 as uuidv4 } from 'uuid'

export class ChallengeMother {
  private id = uuidv4()
  private description =
    'Description 30 char long... Description 30 char long... '
  private goal = 2
  private startDate = new Date('2028-01-01')
  private endDate = new Date('2028-01-05')

  build(): Challenge {
    return Challenge.create(
      this.id,
      this.description,
      this.goal,
      this.startDate,
      this.endDate,
    )
  }

  static create(): Challenge {
    return new ChallengeMother().build()
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withDescription(description: string) {
    this.description = description
    return this
  }

  withGoal(goal: number) {
    this.goal = goal
    return this
  }

  withStartDate(startDate: Date) {
    this.startDate = startDate
    return this
  }

  withEndDate(endDate: Date) {
    this.endDate = endDate
    return this
  }
}
