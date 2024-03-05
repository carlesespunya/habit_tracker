import { InvalidFrequencyError } from './invalid-frequency.error'

export class Frequency {
  private constructor(
    readonly time: number,
    readonly type: string,
    readonly minRestTime: number,
  ) {}

  static create(time: number, type: string, minRestTime: number): Frequency {
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly')
      throw InvalidFrequencyError.withFrequencyType(type)

    if (this.validateFrequency(time, type, minRestTime) === false)
      throw InvalidFrequencyError.withFrequencyAndDuration(type, time)

    return new Frequency(time, type, minRestTime)
  }

  static validateFrequency(time: number, type: string, minRestTime: number) {
    const total = time + minRestTime
    const min = 0
    let max = 0

    switch (type) {
      case 'daily':
        max = 24
        break
      case 'weekly':
        max = 7
        break
      case 'monthly':
        max = 31
        break
    }

    return !(time < min || minRestTime < min || total >= max)
  }
}
