import { IsEnum, IsString } from 'class-validator'
import { CardTypeEnum, ColumnEnum } from 'modules/card/constants/enum'

export class UpdateCardDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsEnum(CardTypeEnum)
    type: CardTypeEnum

    @IsEnum(ColumnEnum)
    status: ColumnEnum
}
