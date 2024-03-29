import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'

export class HabitInMemoryRepository implements HabitRepository {
  habits: Habit[] = []

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findById(id: string): Habit | undefined {
    return this.habits.find((habit) => habit.id === id)
  }

  findByUserAndName(name: string, userId: string): Habit | undefined {
    return this.habits.find(
      (habit) => habit.name === name && habit.userId === userId,
    )
  }

  findByUserId(userId: string): Habit[] {
    return this.habits.filter((habit) => habit.userId === userId)
  }

  addHabits(habits: Habit[]): HabitInMemoryRepository {
    this.habits.push(...habits)
    return this
  }

  isHabitSaved(habit: Habit): boolean {
    return this.habits.some((h) => h.id === habit.id)
  }
}
