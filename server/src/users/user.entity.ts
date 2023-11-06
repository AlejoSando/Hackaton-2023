import {Entity, Column, BeforeInsert, PrimaryColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable} from 'typeorm'
import * as bcrypt from 'bcrypt';
import { UserRole } from './dto/register.dto';
import { Transform } from 'class-transformer'
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity({name: 'users'})
export class User {

    @PrimaryColumn()
    email: string

    @Column()
    surname: string

    @Column()
    name: string
    
    @Column({type: "enum", enum: UserRole, default: UserRole.UNVERIFIED})
    @Transform(({ value }) => value.toUpperCase())
    role: UserRole
    
    @Column({type: 'datetime', nullable:true})
    fec_nac: Date
    
    @Column()
    @Transform(({ value }) => value.trim())
    password: string

    @OneToOne(() => Carrito, carrito => carrito.usuario)
    @JoinColumn()
    carrito: Carrito;

    @BeforeInsert()
    async hashPass(): Promise<void>{
        this.password = await bcrypt.hash(this.password,10)
    }
}

