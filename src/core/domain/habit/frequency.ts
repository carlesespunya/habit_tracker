import { InvalidFrequencyError } from './invalid-frequency';

export class Frequency {
  private constructor(
    private readonly value: number,
    private readonly type: string,
    private readonly minRestTime: number,
  ) {}

  static create(value: number, type: string, minRestTime: number): Frequency {
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly') {
      throw InvalidFrequencyError.withType(type);
    }

    return new Frequency(value, type, minRestTime);
  }
}
