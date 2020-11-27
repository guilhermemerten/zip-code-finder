import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export default class UserEntity {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}
