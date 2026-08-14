import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Aqui se configura el prefijo de las rutas pero se debe 
  // configurar en app.module en true para que afecten todas las rutas dle servicio
  app.setGlobalPrefix('api/v2')

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();