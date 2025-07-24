import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('slot_adjustment_log')
export class SlotAdjustmentLog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slotId: string;

  @Column()
  doctorId: string;

  @Column()
  action: string;

  @Column('jsonb', { nullable: true })
  changeDetails: any;

  @CreateDateColumn()
  timestamp: Date;
}
