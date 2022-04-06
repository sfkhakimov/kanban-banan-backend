import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CardEntity } from 'modules/card/card.entity'

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
}
