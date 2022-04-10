import { IsArray, IsEnum, IsString } from 'class-validator'
import { CardTypeEnum, ColumnEnum } from 'modules/card/constants/enum'
import { UserInterface } from 'modules/user/types/user.interface'

type Field = {
    label: string
    description: string
    value: UserInterface | null
}

export class UpdateCardDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsEnum(CardTypeEnum)
    type: CardTypeEnum

    @IsEnum(ColumnEnum)
    status: ColumnEnum

    @IsArray()
    fields: Field[]
}
