import { JwtPayload } from "jwt-decode"

export interface tokenPayload extends JwtPayload {
    user_id:string
    first_name: string
    last_name: string
    card_number: string
    role: string
}