import { HabitMother } from '../../../test/habit/habit.mother'
import { HabitInMemoryRepository } from '../../../infrastructure/in-memory/habit.in-memory.repository'
import { UserInMemoryRepository } from '../../../infrastructure/in-memory/user.in-memory.repository'
import { GetUserHabitsQueryHandler } from './get-user-habits.query-handler'
import { UserMother } from '../../../test/user/user.mother'
import { GetUserHabitsQuery } from './get-user-habits.query'
import { User } from '../../../domain/user/user'
import { UserNotFoundError } from '../../user-not-found.error'

describe('GetUserHabitsQueryHandler', () => {
  let habitRepository: HabitInMemoryRepository
  let userRepository: UserInMemoryRepository
  let queryHandler: GetUserHabitsQueryHandler

  beforeEach(() => {
    habitRepository = new HabitInMemoryRepository()
    userRepository = new UserInMemoryRepository()

    queryHandler = new GetUserHabitsQueryHandler(
      habitRepository,
      userRepository,
    )
  })

  describe('When the user exists and has habits', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const query = createQueryFromUser(user)

    beforeEach(() => {
      habitRepository.addHabits([habit])
      userRepository.addUsers([user])
    })

    it('should return the user habits', () => {
      const habits = queryHandler.handle(query)

      expect(habits).toEqual([habit])
    })
  })

  describe('When the user does not exist', () => {
    const user = new UserMother().build()
    const query = createQueryFromUser(user)

    it('should throw an error', () => {
      expect(() => queryHandler.handle(query)).toThrowError(
        UserNotFoundError.withId(user.id),
      )
    })
  })

  describe('When there`s more than one user with different habits', () => {
    const habit1 = HabitMother.create()
    const habit2 = HabitMother.create()
    const user1 = new UserMother().withId(habit1.userId).build()
    const user2 = new UserMother().withId(habit2.userId).build()
    const query = createQueryFromUser(user1)

    beforeEach(() => {
      habitRepository.addHabits([habit1, habit2])
      userRepository.addUsers([user1, user2])
    })

    it('should return the user habits', () => {
      const habits = queryHandler.handle(query)

      expect(habits).toEqual([habit1])
    })
  })
})

function createQueryFromUser(user: User) {
  return new GetUserHabitsQuery(user.id)
}
