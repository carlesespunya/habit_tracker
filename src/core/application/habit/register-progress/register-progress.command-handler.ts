import { Injectable } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { RegisterProgressCommand } from './register-progress.command'
import { HabitNotFoundError } from '../habit-not-found.error'

@Injectable()
export class RegisterProgressCommandHandler {
  constructor(private readonly repository: HabitRepository) {}

  handle(command: RegisterProgressCommand) {
    const habit = this.repository.findById(command.habitId)

    if (!habit) throw HabitNotFoundError.withId(command.habitId)

    habit.createProgress(
      command.id,
      command.date,
      command.observations,
      command.validated,
    )

    this.repository.save(habit)
  }
}
