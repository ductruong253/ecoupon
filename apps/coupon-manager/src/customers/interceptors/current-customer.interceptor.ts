import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { CustomersService } from '../customers.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private customersService: CustomersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { customerId } = request.session || {};

    if (customerId) {
      const customer = await this.customersService.getCustomerById(customerId);
      request.currentCustomer = customer;
    }

    return handler.handle();
  }
}
