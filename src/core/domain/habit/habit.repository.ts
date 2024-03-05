import { Habit } from './habit';

export interface HabitRepository {
  save(user: Habit): void;
  findByName(name: string): Habit | undefined;
}

export const HabitRepository = Symbol('HabitRepository');
