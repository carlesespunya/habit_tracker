import { BaseError } from '../../error';

export class HabitAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('habit-already-exists', message);
  }

  static withUsername(name: string) {
    return new HabitAlreadyExistsError(
      `Habit with name ${name} already exists`,
    );
  }
}
