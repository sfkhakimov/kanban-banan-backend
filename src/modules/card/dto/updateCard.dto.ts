import { IsNumber, IsObject } from 'class-validator'
import { CardTypeEnum } from 'modules/card/constants/enum'
import { UserInterface } from 'modules/user/types/user.interface'

type Field = {
    label: string
    description: string
    value: UserInterface | null
}

export class UpdateCardDto {
    @IsNumber()
    swimlaneId: number

    @IsNumber()
    columnId: number

    @IsObject()
    data: {
        title: string
        description: string
        type: CardTypeEnum
        fields: Field[]
    }
}
