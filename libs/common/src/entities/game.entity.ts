import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GamePlay } from './gameplay.entity';
import { GameStatuses } from '../enums';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type: 'enum', enum: GameStatuses})
  status: GameStatuses;

  @OneToMany(() => GamePlay, (gamePlay) => gamePlay.game)
  gamePlays: GamePlay[];
}
