import { Injectable } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { RegisterChallengeCommand } from './register-challenge.command'
import { HabitNotFoundError } from '../habit-not-found.error'

@Injectable()
export class RegisterChallengeCommandHandler {
  constructor(private readonly repository: HabitRepository) {}

  handle(command: RegisterChallengeCommand) {
    const habit = this.repository.findById(command.habitId)

    if (!habit) throw HabitNotFoundError.withId(command.habitId)

    habit.createChallenge(
      command.id,
      command.description,
      command.goal,
      command.startDate,
      command.endDate,
    )

    this.repository.save(habit)
  }
}
