import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { SwimlaneEntity } from 'modules/swimlane/swimlane.entity'
import { UserInterface } from 'modules/user/types/user.interface'

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

    @ManyToMany(() => SwimlaneEntity)
    @JoinTable()
    swimlanes: SwimlaneEntity[]
}
