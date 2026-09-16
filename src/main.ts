import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist filtra y elimina automaticamente 
      // las propiedades que No estan definidas en el DTO
      whitelist: true,
      // forbidNonWhiteListed elimina propiedades no permitidas y
      // LANZA un error si encuentra alguna propiedad que no esta en el DTO
      forbidNonWhitelisted: true,

      transformOptions: {
        // Evita que se transformen una propiedad a undefined en una query si no se ha escrito una propiedad 
        // al colocar  exposeUnserFields: false no se escribe la propiedad como undefined  
        exposeUnsetFields: false,
        //Esta propiedad transforma nuestros Dtos en el tipo de datos que esperamos como esta definido en dto
        //ejemplo pagination.dto.ts usa number pero de los parametros solo recibimos strings
        //aqui es util esta configuracion
        enableImplicitConversion: true,
      }
    })
  )

  //Aqui se configura el prefijo de las rutas pero se debe 
  // configurar en app.module en true para que afecten todas las rutas dle servicio
  app.setGlobalPrefix('api/v2')

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();