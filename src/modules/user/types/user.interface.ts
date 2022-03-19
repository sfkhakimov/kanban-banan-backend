import { UserEntity } from 'modules/user/user.entity'

export type UserInterface = Omit<UserEntity, 'hashPassword' | 'password'>
