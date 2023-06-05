import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EcouponUser } from '@app/common';
import { UserService } from '../user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: EcouponUser;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.getUserById(userId);
      req.currentUser = user;
    }

    next();
  }
}
