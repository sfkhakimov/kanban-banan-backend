import { UserInterface } from 'modules/user/types/user.interface'

export interface ExpressRequestInterface extends Request {
    user?: UserInterface
}
