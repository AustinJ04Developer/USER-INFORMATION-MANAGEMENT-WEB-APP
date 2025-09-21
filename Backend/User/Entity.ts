import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date | string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 200 })
  address!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ 
    type: 'enum', 
    enum: ['Active', 'Inactive', 'Pending'], 
    default: 'Active' 
  })
  status!: 'Active' | 'Inactive' | 'Pending';
}
