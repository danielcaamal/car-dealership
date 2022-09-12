import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {
    private logger = new Logger(this.constructor.name);
}
