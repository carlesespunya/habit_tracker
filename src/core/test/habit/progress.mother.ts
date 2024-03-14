import { Progress } from '../../domain/habit/progress/progress'
import { v4 as uuidv4 } from 'uuid'

export class ProgressMother {
  private id = uuidv4()
  private date = new Date()
  private observations = 'observations'
  private validated = false

  build(): Progress {
    return Progress.create(
      this.id,
      this.date,
      this.observations,
      this.validated,
    )
  }

  static create(): Progress {
    return new ProgressMother().build()
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withDate(date: Date) {
    this.date = date
    return this
  }
}
