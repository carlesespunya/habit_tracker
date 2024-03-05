import { BaseError } from 'src/core/error';

export class InvalidFrequencyError extends BaseError {
  private constructor(message: string) {
    super('invalid-frequency', message);
  }

  static withType(type: string) {
    return new InvalidFrequencyError(`Frequency with type ${type} is invalid`);
  }
}
