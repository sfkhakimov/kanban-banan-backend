import {
    BeforeInsert,
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { hash } from 'bcrypt'
import { UserRolesEnum } from 'common/constants/roles'
import { SALT } from 'config/env'
import { CardEntity } from 'modules/card/card.entity'
import { ProjectEntity } from 'modules/project/project.entity'
import { ColumnEntity } from 'modules/column/column.entity'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column({
        type: 'enum',
        enum: UserRolesEnum,
        default: UserRolesEnum.UserRole,
    })
    roles: UserRolesEnum

    @Column({ select: false })
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, SALT)
    }

    @OneToMany(() => CardEntity, (card) => card.author)
    cards: CardEntity[]

    @OneToMany(() => ProjectEntity, (project) => project.author)
    createdProjects: ProjectEntity[]

    @ManyToMany(() => ProjectEntity, (project) => project.users)
    projects: ProjectEntity[]

    @OneToMany(() => ColumnEntity, (column) => column.author)
    columns: ColumnEntity[]
}
