import { User } from './user'

export interface UserRepository {
  save(user: User): void
  findByUsername(username: string): User | undefined
  findById(id: string): User | undefined
}

export const UserRepository = Symbol('UserRepository')
