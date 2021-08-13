import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('User API')
  .setDescription('Open API documentation for the User API')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, options);

  writeFileSync("./swagger.json", JSON.stringify(document));

  SwaggerModule.setup('swagger', app, document)

  await app.listen(3000);
}
bootstrap();
