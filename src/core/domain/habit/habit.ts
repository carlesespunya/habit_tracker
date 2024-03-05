import { HabitId } from './habit-id';
import { Frequency } from './frequency';

export class Habit {
  private createdAt: Date;
  private habitId: HabitId;
  private frequency: Frequency;

  private constructor(
    id: HabitId,
    frequency: Frequency,
    readonly name: string,
    readonly estimatedTime: number,
  ) {
    this.habitId = id;
    this.frequency = frequency;
    this.createdAt = new Date();
  }

  static create(
    id: string,
    name: string,
    frequency: number,
    frequencyType: string,
    estimatedTime: number,
    minRestTime: number,
  ): Habit {
    const habitId = HabitId.create(id);
    const frequencyObj = Frequency.create(
      frequency,
      frequencyType,
      minRestTime,
    );

    return new Habit(habitId, frequencyObj, name, estimatedTime);
  }
}
