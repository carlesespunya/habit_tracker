import { HabitMother } from '../../../test/habit/habit.mother'
import { HabitInMemoryRepository } from '../../../infrastructure/in-memory/habit.in-memory.repository'
import { HabitNotFoundError } from '../habit-not-found.error'
import { AddReminderCommandHandler } from './add-reminder.command-hanlder'
import { ReminderMother } from '../../../test/habit/reminder.mother'
import { Reminder } from '../../../domain/habit/reminder/reminder'
import { AddReminderCommand } from './add-reminder.command'
import { InvalidReminderError } from '../../../domain/habit/reminder/invalid-reminder.error'

describe('AddReminderCommandHandler', () => {
  let habitRepository: HabitInMemoryRepository
  let commandHandler: AddReminderCommandHandler

  beforeEach(() => {
    habitRepository = new HabitInMemoryRepository()

    commandHandler = new AddReminderCommandHandler(habitRepository)
  })

  describe('When the habit exists, and the paramteter are correct', () => {
    const habit = HabitMother.create()
    const reminder = ReminderMother.create()
    const command = createCommandFromReminderAndHabitId(reminder, habit.id)

    beforeEach(() => {
      habitRepository.save(habit)
    })

    it('should save the habit', () => {
      commandHandler.handle(command)

      expect(habit.reminders).toEqual([reminder])
    })
  })

  describe('When the habit does not exist', () => {
    const reminder = ReminderMother.create()
    const command = createCommandFromReminderAndHabitId(reminder, 'sampleId')

    it('should throw an habit not found error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        HabitNotFoundError.withId('sampleId'),
      )
    })
  })

  describe('When the hour is ivalid', () => {
    it('should throw a invalid progress error', () => {
      expect(() => new ReminderMother().withHour(25).build()).toThrowError(
        InvalidReminderError.withHour(25),
      )
    })
  })

  describe('When the status is invalid', () => {
    it('should throw a invalid progress error', () => {
      expect(() =>
        new ReminderMother().withStatus('invalid').build(),
      ).toThrowError(InvalidReminderError.withStatus())
    })
  })
})

function createCommandFromReminderAndHabitId(
  reminder: Reminder,
  habitId: string,
): AddReminderCommand {
  return new AddReminderCommand({
    id: reminder.id,
    habitId: habitId,
    message: reminder.message,
    status: reminder.status,
    hour: reminder.hour,
  })
}
