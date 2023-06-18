import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EcouponUser } from './ecoupon-user.entity';
import { Game } from './game.entity';

@Entity()
export class GamePlay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playedAt: Date;

  @ManyToOne(()=> EcouponUser, (user) => user.gamePlays)
  user: EcouponUser;

  @ManyToOne(() => Game, (game) => game.gamePlays)
  game: Game;
}
