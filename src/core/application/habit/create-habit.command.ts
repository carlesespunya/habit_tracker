export class CreateHabitCommand {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly name: string,
    readonly frequency: number,
    readonly frequencyType: string,
    readonly estimatedTime: number,
    readonly minRestTime: number,
  ) {}
}
