import { BaseError } from '../../error'

export class InvalidUserError extends BaseError {
  private constructor(message: string) {
    super('user-missing-fields', message)
  }

  static forFields(fields: Array<string>) {
    return new InvalidUserError(`User missing fields: ${fields.join(', ')}`)
  }
}
