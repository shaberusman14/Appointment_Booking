import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { User } from '../users/user.entity';
import { Slot } from '../slots/slot.entity';

@Entity('doctors')
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  fullName: string;

  @Column({ default: '' })
  specialization: string;

  @Column({ default: '' })
  bio: string;

  @OneToOne(() => User, (user) => user.doctorProfile)
  @JoinColumn()
  user: User;

  @OneToMany(() => Slot, (slot) => slot.doctor)
  slots: Slot[];
}
