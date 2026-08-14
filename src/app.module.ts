import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),

    //Para que el prefijo de todas las rutas de mi servicio 
    //se vean afectadas se debe configurar true
      useGlobalPrefix:true
    }),
    //No acepta localhost porque la configuracion ahora no lee IPv4 sino IPv6 
    // por eso se usa 127.0.0.1 para forzar IPv4
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-pokemon'),

    PokemonModule,
  ],
})
export class AppModule {}
