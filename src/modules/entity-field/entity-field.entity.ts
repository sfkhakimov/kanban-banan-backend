import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'entity-fields' })
export class EntityFieldEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

    @Column({ default: '' })
    description: string

    @Column({ type: 'json', default: null })
    value: Record<string, unknown>
}
