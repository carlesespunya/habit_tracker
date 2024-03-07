import { Habit } from './habit'

export interface HabitRepository {
  save(user: Habit): void
  findById(id: string): Habit | undefined
  findByUserAndName(name: string, userId: string): Habit | undefined
  findByUserId(userId: string): Habit[]
}

export const HabitRepository = Symbol('HabitRepository')
