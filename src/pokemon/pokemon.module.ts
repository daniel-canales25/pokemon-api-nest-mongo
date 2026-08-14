import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],

  //En este lugar de importan los Schemas 
  imports:[
    MongooseModule.forFeature([
      {
        //Pokemon.name viene de la extencion de Document de mongo
        name: Pokemon.name, 
        //Schema importado aqui
        schema: PokemonSchema

      }
    ])
  ]
})
export class PokemonModule {}
