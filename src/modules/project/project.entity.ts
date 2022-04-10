import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinTable,
} from 'typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'
import { UserInterface } from 'modules/user/types/user.interface'
import { EntityFieldEntity } from 'modules/entity-field/entity-field.entity'
import { CardEntity } from 'modules/card/card.entity'

@Entity({ name: 'projects' })
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => UserEntity, (user) => user.projects)
    author: UserInterface

    @ManyToMany(() => UserEntity, (user) => user.projects)
    @JoinTable()
    users: UserInterface[]

    @OneToMany(() => SwimlaneEntity, (swimlane) => swimlane.project)
    swimlanes: SwimlaneEntity[]

    @OneToMany(() => CardEntity, (card) => card.project)
    cards: CardEntity[]

    @ManyToMany(() => EntityFieldEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    fields: EntityFieldEntity[]
}
