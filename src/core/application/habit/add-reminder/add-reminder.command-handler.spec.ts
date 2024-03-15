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

  describe('When the reminder is repeated', () => {
    const habit = HabitMother.create()
    const reminder = ReminderMother.create()
    const command = createCommandFromReminderAndHabitId(reminder, habit.id)

    beforeEach(() => {
      habitRepository.save(habit)
      commandHandler.handle(command)
    })

    it('should throw a invalid reminder error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        InvalidReminderError.repeatedFroHabit(habit.id),
      )
    })
  })

  describe('When the habit has reached the maximum number of reminders', () => {
    const habit = HabitMother.create()
    const reminder = ReminderMother.create()
    const command = createCommandFromReminderAndHabitId(reminder, habit.id)

    beforeEach(() => {
      habitRepository.save(habit)
      habit.addReminder('2', 'message', 'active', 10)
      habit.addReminder('3', 'message', 'active', 11)
      habit.addReminder('4', 'message', 'active', 12)
    })

    it('should throw a invalid reminder error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        InvalidReminderError.maxRemindersForHabitId(habit.id),
      )
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
