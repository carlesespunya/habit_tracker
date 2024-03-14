export class RegisterProgressCommand {
  id: string
  habitId: string
  date: Date
  observations: string
  validated: boolean

  constructor(params: {
    id: string
    habitId: string
    date: Date
    observations: string
    validated: boolean
  }) {
    this.id = params.id
    this.habitId = params.habitId
    this.date = params.date
    this.observations = params.observations
    this.validated = params.validated
  }
}
