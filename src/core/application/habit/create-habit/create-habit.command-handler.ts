import { Injectable } from '@nestjs/common'
import { CreateHabitCommand } from './create-habit.command'
import { HabitAlreadyExistsError } from './habit-already-exists.error'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { Habit } from '../../../domain/habit/habit'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserNotFoundError } from '../../user-not-found.error'

@Injectable()
export class CreateHabitCommandHandler {
  constructor(
    private readonly repository: HabitRepository,
    private readonly userRepository: UserRepository,
  ) {}

  handle(command: CreateHabitCommand) {
    if (!this.userRepository.findById(command.userId))
      throw UserNotFoundError.withId(command.userId)

    if (this.repository.findByUserAndName(command.name, command.userId))
      throw HabitAlreadyExistsError.withName(command.name)

    const habit = Habit.create(
      command.id,
      command.userId,
      command.name,
      command.frequencyType,
      command.estimatedTime,
      command.minRestTime,
      command.wearableDeviceId,
    )

    this.repository.save(habit)
  }
}
