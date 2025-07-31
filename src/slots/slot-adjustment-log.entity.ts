import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  
} from 'typeorm';

export enum SlotAdjustmentAction {
  UPDATE_TIME_WINDOW = 'update-time-window',
  UPDATE_SLOT_DURATION = 'update-slot-duration',
  BULK_RESCHEDULE = 'bulk-reschedule',
}


@Entity('slot_adjustment_log')
export class SlotAdjustmentLog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slotId: string;

  @Column()
  doctorId: string;

  // @Column()
  // action: string;

  @Column('jsonb', { nullable: true })
  changeDetails: any;

  @CreateDateColumn()
  timestamp: Date;

  
@Column({ type: 'enum', enum: SlotAdjustmentAction })
action: SlotAdjustmentAction;


}
