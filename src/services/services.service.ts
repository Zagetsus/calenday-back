import { Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async findByName(name: string) {
    return await this.serviceRepository.findOne({ name });
  }

  async findAll() {
    return await this.serviceRepository.find();
  }

  async create(data) {
    const serviceCreated = this.serviceRepository.create(data);
    return await this.serviceRepository.save(serviceCreated);
  }
}
