import { SocketTypeEnum } from 'modules/events/constants/enum'

export type SocketResponseTypes = {
    type: SocketTypeEnum
    id: number
    data: any
}
