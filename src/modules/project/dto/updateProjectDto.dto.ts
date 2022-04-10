import { CreateProjectDto } from 'modules/project/dto/createProject.dto'
import { IsArray, IsJSON } from 'class-validator'

type ProjectFieldType = {
    label: string
    description: string
    value: null
}

export class UpdateProjectDtoDto extends CreateProjectDto {
    @IsArray()
    fields: ProjectFieldType[]
}
