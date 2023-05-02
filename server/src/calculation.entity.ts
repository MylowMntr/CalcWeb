import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Calculation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expression: string;

  @Column()
  result: number;

  @Column()
  duration: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}