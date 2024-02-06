import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);
  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image_url: 'http://localhost:9000/products/1.png',
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image_url: 'http://localhost:9000/products/2.png',
    },
    {
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      image_url: 'http://localhost:9000/products/3.png',
    },
    {
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      image_url: 'http://localhost:9000/products/4.png',
    },
    {
      name: 'Product 5',
      description: 'Description 5',
      price: 500,
      image_url: 'http://localhost:9000/products/5.png',
    },
    {
      name: 'Product 6',
      description: 'Description 6',
      price: 600,
      image_url: 'http://localhost:9000/products/6.png',
    },
    {
      name: 'Product 7',
      description: 'Description 7',
      price: 700,
      image_url: 'http://localhost:9000/products/7.png',
    },
    {
      name: 'Product 8',
      description: 'Description 8',
      price: 800,
      image_url: 'http://localhost:9000/products/8.png',
    },
    {
      name: 'Product 9',
      description: 'Description 9',
      price: 900,
      image_url: 'http://localhost:9000/products/9.png',
    },
    {
      name: 'Product 10',
      description: 'Description 10',
      price: 1000,
      image_url: 'http://localhost:9000/products/10.png',
    },
    {
      name: 'Product 11',
      description: 'Description 11',
      price: 1100,
      image_url: 'http://localhost:9000/products/11.png',
    },
    {
      name: 'Product 12',
      description: 'Description 12',
      price: 1200,
      image_url: 'http://localhost:9000/products/12.png',
    },
    {
      name: 'Product 13',
      description: 'Description 13',
      price: 1300,
      image_url: 'http://localhost:9000/products/13.png',
    },
    {
      name: 'Product 14',
      description: 'Description 14',
      price: 1400,
      image_url: 'http://localhost:9000/products/14.png',
    },
    {
      name: 'Product 15',
      description: 'Description 15',
      price: 1500,
      image_url: 'http://localhost:9000/products/15.png',
    },
    {
      name: 'Product 16',
      description: 'Description 16',
      price: 1600,
      image_url: 'http://localhost:9000/products/16.png',
    },
    {
      name: 'Product 17',
      description: 'Description 17',
      price: 1700,
      image_url: 'http://localhost:9000/products/17.png',
    },
    {
      name: 'Product 18',
      description: 'Description 18',
      price: 1800,
      image_url: 'http://localhost:9000/products/18.png',
    },
    {
      name: 'Product 19',
      description: 'Description 19',
      price: 1900,
      image_url: 'http://localhost:9000/products/19.png',
    },
    {
      name: 'Product 20',
      description: 'Description 20',
      price: 2000,
      image_url: 'http://localhost:9000/products/20.png',
    },
  ]);

  await app.close();
}
bootstrap();
