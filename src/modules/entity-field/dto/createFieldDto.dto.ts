import { IsJSON, IsString } from 'class-validator'

export class CreateFieldDtoDto {
    @IsString()
    label: string

    @IsString()
    description: string

    @IsJSON()
    value: Record<string, unknown>
}
