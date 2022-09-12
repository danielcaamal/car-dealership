import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Ford',
            model: 'Fiesta',
        },
        {
            id: uuid(),
            brand: 'Ford',
            model: 'Focus',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Accord',
        },
    ];

    public findAll() {
        return this.cars;
    }

    public findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    public create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        };
        this.cars.push(newCar);
        return newCar;
    }

    public update(id:string, updateCarDto: UpdateCarDto) {
        let carDb = this.findOneById(id);
        if (updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id ${id} does not match id in body ${updateCarDto.id}`);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDb = { ...carDb, ...updateCarDto, id };
                return carDb;
            }
            return car;
        });
        return carDb;
    }

    public delete(id: string) {
        const car = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return car;
    }
}
