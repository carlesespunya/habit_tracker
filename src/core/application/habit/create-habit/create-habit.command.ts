export class CreateHabitCommand {
  id: string
  userId: string
  name: string
  frequencyType: string
  estimatedTime: number
  minRestTime: number

  constructor(params: {
    id: string
    userId: string
    name: string
    frequencyType: string
    estimatedTime: number
    minRestTime: number
  }) {
    this.id = params.id
    this.userId = params.userId
    this.name = params.name
    this.frequencyType = params.frequencyType
    this.estimatedTime = params.estimatedTime
    this.minRestTime = params.minRestTime
  }
}
