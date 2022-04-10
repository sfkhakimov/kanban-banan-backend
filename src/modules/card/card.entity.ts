import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { CardTypeEnum } from 'modules/card/constants/enum'
import { UserInterface } from 'modules/user/types/user.interface'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'
import { EntityFieldEntity } from 'modules/entity-field/entity-field.entity'
import { ProjectEntity } from 'modules/project/project.entity'
import { ColumnEntity } from 'modules/column/column.entity'

@Entity({ name: 'cards ' })
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: null })
    description: string | null

    @Column({ type: 'enum', enum: CardTypeEnum, default: CardTypeEnum.Normal })
    type: CardTypeEnum

    @ManyToOne(() => UserEntity, (user) => user.cards)
    author: UserInterface

    @ManyToOne(() => SwimlaneEntity, (swimlane) => swimlane.cards)
    swimlane: SwimlaneEntity

    @ManyToOne(() => ProjectEntity, (project) => project.cards)
    project: ProjectEntity

    @ManyToMany(() => EntityFieldEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    fields: EntityFieldEntity[]

    @ManyToOne(() => ColumnEntity, (column) => column.cards)
    column: ColumnEntity
}
