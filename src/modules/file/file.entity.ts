import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { FileTypeEnum } from 'modules/file/constants/enum'

@Entity({ name: 'files' })
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column({ type: 'enum', enum: FileTypeEnum })
    type: FileTypeEnum

    @Column()
    name: string
}
