import { HabitMother } from '../../../test/habit/habit.mother'
import { HabitInMemoryRepository } from '../../../infrastructure/in-memory/habit.in-memory.repository'
import { RegisterChallengeCommandHandler } from './register-challenge.command-handler'
import { RegisterChallengeCommand } from './register-challenge.command'
import { ChallengeMother } from '../../../test/habit/challenge.mother'
import { Challenge } from '../../../domain/habit/Challenge/Challenge'
import { HabitNotFoundError } from '../habit-not-found.error'
import { InvalidChallengeError } from '../../../domain/habit/challenge/invalid-challenge.error'

describe('RegisterChallengeCommandHandler', () => {
  let habitRepository: HabitInMemoryRepository
  let commandHandler: RegisterChallengeCommandHandler

  beforeEach(() => {
    habitRepository = new HabitInMemoryRepository()

    commandHandler = new RegisterChallengeCommandHandler(habitRepository)
  })

  describe('When the habit exists, and the paramteter are correct', () => {
    const habit = HabitMother.create()
    const challenge = ChallengeMother.create()
    const command = createCommandFromChallengeAndHabitId(challenge, habit.id)

    beforeEach(() => {
      habitRepository.save(habit)
    })

    it('should save the habit', () => {
      commandHandler.handle(command)

      expect(habit.challenges).toEqual([challenge])
    })
  })

  describe('When the habit does not exist', () => {
    const challenge = ChallengeMother.create()
    const command = createCommandFromChallengeAndHabitId(challenge, 'sampleId')

    it('should throw an habit not found error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        HabitNotFoundError.withId('sampleId'),
      )
    })
  })

  describe('When the Challenge date is in the past', () => {
    const pastDate = new Date('2022-01-01')

    it('should throw a invalid Challenge error', () => {
      expect(() =>
        new ChallengeMother().withStartDate(pastDate).build(),
      ).toThrowError(InvalidChallengeError.withStartDate(pastDate))
    })
  })

  describe('When the Challenge is not possible between the dates', () => {
    const startDate = new Date('2028-04-04')
    const endDate = new Date('2028-04-03')

    it('should throw a invalid Challenge error', () => {
      expect(() =>
        new ChallengeMother()
          .withStartDate(startDate)
          .withEndDate(endDate)
          .build(),
      ).toThrowError(
        InvalidChallengeError.withStartDateAndEndDate(startDate, endDate),
      )
    })
  })

  describe('When the Challenge has negative goal', () => {
    it('should throw a invalid Challenge error', () => {
      expect(() => new ChallengeMother().withGoal(-1).build()).toThrowError(
        InvalidChallengeError.withGoal(-1),
      )
    })
  })

  describe('When the Challenge has short description', () => {
    it('should throw a invalid Challenge error', () => {
      expect(() =>
        new ChallengeMother().withDescription('Short desc').build(),
      ).toThrowError(InvalidChallengeError.withDescription('Short desc'))
    })
  })
})

function createCommandFromChallengeAndHabitId(
  challenge: Challenge,
  habitId: string,
): RegisterChallengeCommand {
  return new RegisterChallengeCommand({
    id: challenge.id,
    habitId: habitId,
    description: challenge.description,
    goal: challenge.goal,
    startDate: challenge.startDate,
    endDate: challenge.endDate,
  })
}
