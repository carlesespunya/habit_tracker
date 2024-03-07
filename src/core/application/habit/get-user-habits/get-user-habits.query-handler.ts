import { Injectable } from '@nestjs/common'
import { HabitRepository } from '../../../domain/habit/habit.repository'
import { UserRepository } from '../../../domain/user/user.repository'
import { UserNotFoundError } from '../../user-not-found.error'
import { GetUserHabitsQuery } from './get-user-habits.query'

@Injectable()
export class GetUserHabitsQueryHandler {
  constructor(
    private readonly repository: HabitRepository,
    private readonly userRepository: UserRepository,
  ) {}

  handle(query: GetUserHabitsQuery): any {
    if (!this.userRepository.findById(query.userId))
      throw UserNotFoundError.withId(query.userId)

    return this.repository.findByUserId(query.userId)
  }
}
