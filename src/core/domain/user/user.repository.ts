import { User } from './User';

export interface UserRepository {
  save(User: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
