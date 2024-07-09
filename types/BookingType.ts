import { MenuType } from "./MenuType"
import { UserType } from "./UserType"

export interface BookingType {
    creator: UserType
    amount: number
    menu: MenuType
}