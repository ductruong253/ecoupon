import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GamePlay } from './gameplay.entity';
import { GameStatuses } from '../enums';
import { GameContent } from './gameContent.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: GameStatuses })
  status: GameStatuses;

  @OneToMany(() => GamePlay, (gamePlay) => gamePlay.game)
  gamePlays: GamePlay[];

  @Column({ type: 'integer', array: true, default: [] })
  gameContent: number[];

  @Column()
  vendorCode: string;
}
