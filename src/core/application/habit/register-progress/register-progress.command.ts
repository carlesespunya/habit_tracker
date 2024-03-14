export class RegisterProgressCommand {
  id: string
  habitId: string
  date: Date
  observations: string

  constructor(params: {
    id: string
    habitId: string
    date: Date
    observations: string
  }) {
    this.id = params.id
    this.habitId = params.habitId
    this.date = params.date
    this.observations = params.observations
  }
}
