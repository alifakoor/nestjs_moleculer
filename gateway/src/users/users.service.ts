import { Injectable } from '@nestjs/common';
import { ServiceBroker } from 'moleculer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly broker: ServiceBroker;

  constructor() {
    this.broker = new ServiceBroker({
      transporter: 'NATS',
    });
    this.broker.start();
  }

  async create(body: CreateUserDto): Promise<User> {
    return await this.broker.call('users.create', body);
  }

  async findAll(): Promise<Array<User>> {
    return await this.broker.call('users.list');
  }

  async findOne(id: string): Promise<User> {
    return await this.broker.call('users.get', { id });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.broker.call('users.count', { query: { username } });
  }

  async update(id: string, body: UpdateUserDto): Promise<User> {
    return await this.broker.call('users.update', { id, ...body });
  }

  async remove(id: string): Promise<User> {
    return await this.broker.call('users.remove', { id });
  }
}
