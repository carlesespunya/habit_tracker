import { Habit } from './habit'

export interface HabitRepository {
  save(user: Habit): void
  findByUserAndName(name: string, userId: string): Habit | undefined
}

export const HabitRepository = Symbol('HabitRepository')
