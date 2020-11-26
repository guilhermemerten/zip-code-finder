import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('zipcode')
export default class ZipCodeEntity {
  @PrimaryColumn()
  zipcode: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;
}
