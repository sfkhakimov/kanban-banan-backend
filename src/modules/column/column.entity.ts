import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { CardEntity } from 'modules/card/card.entity'
import { ProjectEntity } from 'modules/project/project.entity'
import { UserEntity } from 'modules/user/user.entity'
import { UserInterface } from 'modules/user/types/user.interface'

@Entity({ name: 'columns' })
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => CardEntity, (card) => card.column)
    cards: CardEntity[]

    @ManyToOne(() => ProjectEntity, (project) => project.columns)
    project: ProjectEntity

    @ManyToOne(() => UserEntity, (user) => user.columns)
    author: UserInterface
}
