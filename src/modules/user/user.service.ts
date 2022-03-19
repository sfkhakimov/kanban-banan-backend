import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from 'modules/user/dto/createUserDto'
import { ERROR_DUPLICATE_USER } from 'common/constants/errors'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async getUser() {
        return 'Получение юзера'
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

        return this.userRepository.save(newUser)
    }
}
