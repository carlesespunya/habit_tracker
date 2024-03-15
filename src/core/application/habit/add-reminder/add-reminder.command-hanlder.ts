import { Injectable } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { AddReminderCommand } from './add-reminder.command'
import { HabitNotFoundError } from '../habit-not-found.error'

@Injectable()
export class AddReminderCommandHandler {
  constructor(private readonly repository: HabitRepository) {}

  handle(command: AddReminderCommand) {
    const habit = this.repository.findById(command.habitId)

    if (!habit) throw HabitNotFoundError.withId(command.habitId)

    habit.addReminder(command.id, command.message, command.status, command.hour)

    this.repository.save(habit)
  }
}
