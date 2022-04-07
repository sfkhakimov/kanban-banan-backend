import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { CardEntity } from 'modules/card/card.entity'
import { ProjectEntity } from 'modules/project/project.entity'

@Entity({ name: 'swimlanes' })
export class SwimlaneEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => CardEntity, (card) => card.swimlane)
    cards: CardEntity[]

    @ManyToOne(() => ProjectEntity, (project) => project.swimlanes)
    project: ProjectEntity
}
