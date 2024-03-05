import { InvalidUserError } from './invalid-user.error'

export class User {
  private createdAt: Date
  private lastUpdatedAt: Date

  constructor(
    readonly id: string,
    readonly username: string,
    readonly fullname: string,
  ) {
    const missingFields = []
    if (username === '') missingFields.push('username')
    if (fullname === '') missingFields.push('fullname')

    if (missingFields.length > 0)
      throw InvalidUserError.forFields(missingFields)

    this.createdAt = new Date()
    this.lastUpdatedAt = new Date()
  }
}
