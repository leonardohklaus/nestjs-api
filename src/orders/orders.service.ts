import { Product } from '../products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const productIds = createOrderDto.items.map((item) => item.product_id);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepo.findBy({ id: In(productIds) });

    if (products.length !== uniqueProductIds.length) {
      throw new Error(
        `Product not found. Products ${productIds}. Products found ${products.map(
          (p) => p.id,
        )}`,
      );
    }

    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return {
          product_id: item.product_id,
          price: product.price,
          quantity: item.quantity,
        };
      }),
    });
    await this.orderRepo.save(order);
    this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });
    return order;
  }

  findAll(client_id: number) {
    return this.orderRepo.find({
      where: {
        client_id,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: number, client_id: number) {
    return this.orderRepo.findOneByOrFail({ id, client_id });
  }
}
