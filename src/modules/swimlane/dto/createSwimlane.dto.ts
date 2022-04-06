import { IsString } from 'class-validator'

export class CreateSwimlaneDto {
    @IsString()
    name: string

    @IsString()
    description: string
}
