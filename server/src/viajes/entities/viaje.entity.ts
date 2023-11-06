import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  horaSalida: Date;

  @Column()
  horaLlegada: Date;

  @Column()
  origen: string;

  @Column()
  destino: string;
  
  @Column()
  costo: number;

  @Column()
  numeroVuelo: string;

  @ManyToOne(() => Carrito, carrito => carrito.viajes)
  carrito: Carrito;
}
