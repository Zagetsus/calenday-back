import { Controller, Post, Request, Response, Body, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Public, SALON } from '../utils/constants';

@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) {}

  @Public()
  @Get()
  async index(@Request() request, @Response() response) {
    const services = await this.service.findAll();
    response.status(200).json(services);
  }

  @Post()
  async store(@Request() request, @Response() response, @Body() body) {
    const { permission } = request.user;

    if (permission !== SALON) {
      return response.status(401).json({
        status: false,
        message: 'Você não tem permissão para cadastrar um funcionário',
      });
    }

    if (!body.name || !body.duration || !body.price) {
      return response.status(400).json({
        status: false,
        message: 'Insira todos os dados do serviço',
      });
    }

    const existsService = await this.service.findByName(body.name);

    if (existsService)
      return response.status(400).json({
        status: false,
        message: 'Esse serviço já foi cadastrado',
      });

    const newService = await this.service.create(body);

    return response.status(201).json(newService);
  }
}
