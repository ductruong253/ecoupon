import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      authorized?: boolean;
    }
  }
}

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  readonly secret = this.configService.get('SECRET');
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const [_, token] = authHeader.split(' ');
      if (token && token === this.secret) {
        req.authorized = true;
      }
    } else {
      req.authorized = false;
    }

    next();
  }
}
