export class RegisterChallengeCommand {
  id: string
  habitId: string
  description: string
  startDate: Date
  endDate: Date
  goal: number

  constructor(params: {
    id: string
    habitId: string
    description: string
    startDate: Date
    endDate: Date
    goal: number
  }) {
    this.id = params.id
    this.habitId = params.habitId
    this.description = params.description
    this.startDate = params.startDate
    this.endDate = params.endDate
    this.goal = params.goal
  }
}
