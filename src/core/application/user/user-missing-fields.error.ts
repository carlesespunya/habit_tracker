import { BaseError } from '../../error';

export class UserMissingFieldsError extends BaseError {
  private constructor(message: string) {
    super('user-missing-fields', message);
  }

  static forFields(fields: Array<string>) {
    return new UserMissingFieldsError(
      `User missing fields: ${fields.join(', ')}`,
    );
  }
}
