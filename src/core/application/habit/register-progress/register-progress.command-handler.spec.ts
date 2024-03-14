import { HabitMother } from '../../../test/habit/habit.mother'
import { HabitInMemoryRepository } from '../../../infrastructure/in-memory/habit.in-memory.repository'
import { RegisterProgressCommandHandler } from './register-progress.command-handler'
import { RegisterProgressCommand } from './register-progress.command'
import { ProgressMother } from '../../../test/habit/progress.mother'
import { Progress } from '../../../domain/habit/progress/progress'
import { HabitNotFoundError } from '../habit-not-found.error'
import { InvalidProgressError } from '../../../domain/habit/progress/invalid-progress.error'

describe('RegisterProgressCommandHandler', () => {
  let habitRepository: HabitInMemoryRepository
  let commandHandler: RegisterProgressCommandHandler

  beforeEach(() => {
    habitRepository = new HabitInMemoryRepository()

    commandHandler = new RegisterProgressCommandHandler(habitRepository)
  })

  describe('When the habit exists, and the paramteter are correct', () => {
    const habit = HabitMother.create()
    const progress = ProgressMother.create()
    const command = createCommandFromProgressAndHabitId(progress, habit.id)

    beforeEach(() => {
      habitRepository.save(habit)
    })

    it('should save the habit', () => {
      commandHandler.handle(command)

      expect(habit.progress).toEqual([progress])
    })
  })

  describe('When the habit does not exist', () => {
    const progress = ProgressMother.create()
    const command = createCommandFromProgressAndHabitId(progress, 'sampleId')

    it('should throw an habit not found error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        HabitNotFoundError.withId('sampleId'),
      )
    })
  })

  describe('When the progress date is in the future', () => {
    const futureDate = new Date('2025-01-01')

    it('should throw a invalid progress error', () => {
      expect(() =>
        new ProgressMother().withDate(futureDate).build(),
      ).toThrowError(InvalidProgressError.withDate(futureDate))
    })
  })
})

function createCommandFromProgressAndHabitId(
  progress: Progress,
  habitId: string,
): RegisterProgressCommand {
  return new RegisterProgressCommand({
    id: progress.id,
    habitId: habitId,
    date: progress.date,
    observations: progress.observations,
  })
}
