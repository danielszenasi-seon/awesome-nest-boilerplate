import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedDate: Date;
}
