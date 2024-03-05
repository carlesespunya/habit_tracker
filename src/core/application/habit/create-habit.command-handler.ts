import { Inject, Injectable } from '@nestjs/common';
import { CreateHabitCommand } from './create-habit.command';
import { HabitAlreadyExistsError } from './habit-already-exists.error';
import { HabitRepository } from 'src/core/domain/habit/habit.repository';
import { Habit } from 'src/core/domain/habit/habit';

@Injectable()
export class CreateHabitCommandHanlder {
  constructor(
    @Inject(HabitRepository) private readonly repository: HabitRepository,
  ) {}

  handle(command: CreateHabitCommand) {
    if (this.repository.findByName(command.name)) {
      throw HabitAlreadyExistsError.withUsername(command.name);
    }

    const habit = Habit.create(
      command.id,
      command.name,
      command.frequency,
      command.frequencyType,
      command.estimatedTime,
      command.minRestTime,
    );

    this.repository.save(habit);
  }
}
