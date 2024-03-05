export class HabitId {
  private constructor(private readonly value: string) {}

  static create(value: string): HabitId {
    if (!value || value.length < 8) {
      throw new Error('HabitId is required');
    }

    return new HabitId(value);
  }
}
