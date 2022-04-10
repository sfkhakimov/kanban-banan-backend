import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { CardTypeEnum, ColumnEnum } from 'modules/card/constants/enum'
import { UserInterface } from 'modules/user/types/user.interface'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'
import { EntityFieldEntity } from 'modules/entity-field/entity-field.entity'
import { ProjectEntity } from 'modules/project/project.entity'

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

    @Column({ type: 'enum', enum: ColumnEnum, default: ColumnEnum.Open })
    status: ColumnEnum

    @ManyToOne(() => UserEntity, (user) => user.cards)
    author: UserInterface

    @ManyToOne(() => SwimlaneEntity, (swimlane) => swimlane.cards)
    swimlane: SwimlaneEntity

    @ManyToOne(() => ProjectEntity, (project) => project.cards)
    project: ProjectEntity

    @ManyToMany(() => EntityFieldEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    fields: EntityFieldEntity[]
}
