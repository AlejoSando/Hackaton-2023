import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pasajero {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombres: string

    @Column()
    paisResidencia: string

    @Column()
    tipoDocumento: string

    @Column()
    numDocumento: number

    @Column()
    genero: string

    @Column()
    telefono: number

    @Column()
    tipopago: string
}