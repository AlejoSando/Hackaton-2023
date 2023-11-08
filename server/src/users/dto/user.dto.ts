import { Entity } from "typeorm";
import { UserRole } from "./register.dto";

@Entity()
export class UserDB {
    password: string    
    email: string
    name: string
    surname: string
    role: UserRole
    fec_nac: string
}