import { User } from 'src/users/user.entity';
import { Viaje } from 'src/viajes/entities/viaje.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class Carrito {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => User, User => User.carrito)
    @JoinColumn()
    usuario: User;

    @Column()
    precioTotal: number;

    @OneToMany(() => Viaje, viaje => viaje.carrito)
    viajes: Viaje[];

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
