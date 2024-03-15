export class AddReminderCommand {
  id: string
  habitId: string
  message: string
  status: string
  hour: number

  constructor(params: {
    id: string
    habitId: string
    message: string
    status: string
    hour: number
  }) {
    this.id = params.id
    this.habitId = params.habitId
    this.message = params.message
    this.status = params.status
    this.hour = params.hour
  }
}
