import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse()
  getHello(): string {
    return this.appService.getHello();
  }
}
