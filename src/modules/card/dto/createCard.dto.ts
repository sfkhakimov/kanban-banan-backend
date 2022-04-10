import { IsNumber, IsObject } from 'class-validator'
import { CardTypeEnum } from 'modules/card/constants/enum'

export class CreateCardDto {
    @IsNumber()
    projectId: number

    @IsNumber()
    swimlaneId: number

    @IsNumber()
    columnId: number

    @IsObject()
    data: {
        title: string
        description: string
        type: CardTypeEnum
    }
}
