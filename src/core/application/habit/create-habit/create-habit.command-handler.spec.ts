import { CreateHabitCommandHandler } from './create-habit.command-handler'
import { UserInMemoryRepository } from '../../../infrastructure/in-memory/user.in-memory.repository'
import { HabitInMemoryRepository } from '../../../infrastructure/in-memory/habit.in-memory.repository'
import { CreateHabitCommand } from './create-habit.command'
import { UserNotFoundError } from '../../user-not-found.error'
import { UserMother } from '../../../test/user/user.mother'
import { HabitMother } from '../../../test/habit/habit.mother'
import { Habit } from '../../../domain/habit/habit'
import { HabitAlreadyExistsError } from './habit-already-exists.error'
import { InvalidFrequencyError } from '../../../domain/habit/invalid-frequency.error'

describe('CreateHabitCommandHandler', () => {
  let habitRepository: HabitInMemoryRepository
  let userRepository: UserInMemoryRepository
  let commandHandler: CreateHabitCommandHandler

  beforeEach(() => {
    habitRepository = new HabitInMemoryRepository()
    userRepository = new UserInMemoryRepository()

    commandHandler = new CreateHabitCommandHandler(
      habitRepository,
      userRepository,
    )
  })

  describe('When the habit is valid and the user exists', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const command = createCommandFromHabit(habit)

    beforeEach(() => {
      userRepository.addUsers([user])
    })

    it('should save the habit', () => {
      commandHandler.handle(command)

      expect(habitRepository.isHabitSaved(habit)).toBeTruthy()
    })
  })

  describe('when user does not exist', () => {
    const habit = HabitMother.create()
    const command = createCommandFromHabit(habit)

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        UserNotFoundError.withId(habit.userId),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.habits).toHaveLength(0)
    })
  })

  describe('When the habit already exists', () => {
    const existingHabit = HabitMother.create()
    const user = new UserMother().withId(existingHabit.userId).build()
    const habit = new HabitMother().withId('newId').build()

    const command = createCommandFromHabit(existingHabit)

    beforeEach(() => {
      userRepository.addUsers([user])
      habitRepository.addHabits([existingHabit])
    })

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        HabitAlreadyExistsError.withName(command.name),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.isHabitSaved(habit)).toBeFalsy()
    })
  })

  describe('When the habit frequency and rest time are not valid', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const command = new CreateHabitCommand({
      id: habit.id,
      userId: habit.userId,
      name: habit.name,
      frequencyType: 'daily',
      estimatedTime: 23,
      minRestTime: 3,
    })

    beforeEach(() => {
      userRepository.addUsers([user])
    })

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        InvalidFrequencyError.withFrequencyAndDuration(
          command.frequencyType,
          command.estimatedTime,
        ),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.habits).toHaveLength(0)
    })
  })
})

function createCommandFromHabit(habit: Habit): CreateHabitCommand {
  return new CreateHabitCommand({
    id: habit.id,
    userId: habit.userId,
    name: habit.name,
    frequencyType: habit.frequency.type,
    estimatedTime: habit.frequency.time,
    minRestTime: habit.frequency.minRestTime,
  })
}
