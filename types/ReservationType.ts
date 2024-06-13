import { MenuType } from "./MenuType"

export interface ReservationType{
    _id: string
    menu: MenuType
    date: string
    amount: number
}