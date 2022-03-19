import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from 'modules/user/dto/createUserDto'
import { ERROR_DUPLICATE_USER } from 'common/constants/errors'
import { UserInterface } from 'modules/user/types/user.interface'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async getUser(user?: UserInterface): Promise<UserInterface> {
        return await this.userRepository.findOne({ email: user.email })
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne(
            { email },
            {
                select: [
                    'id',
                    'email',
                    'firstName',
                    'lastName',
                    'roles',
                    'password',
                ],
            },
        )
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const findUser = await this.userRepository.findOne({
            email: createUserDto.email,
        })

        if (findUser) {
            throw new HttpException(
                ERROR_DUPLICATE_USER,
                HttpStatus.UNPROCESSABLE_ENTITY,
            )
        }

        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)

        const user = await this.userRepository.save(newUser)

        delete user.password

        return user
    }
}
