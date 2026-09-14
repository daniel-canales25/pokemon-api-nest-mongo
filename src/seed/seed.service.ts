import { Injectable } from '@nestjs/common';
import axios,{AxiosInstance} from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios

  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel : Model<Pokemon>
    ){}

  

  async executeSeed(){
    await this.pokemonModel.deleteMany({}) //delete* from pokemons (asegura que no haya duplicidad)

    //Peticion a PokeApi 
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');

    const pokemonToInsert: { name: string, no: number} [] = []

    data.results.forEach(async({name, url})=>{
      const segments = url.split('/')
      const no = +segments[segments.length -2]
//Esta insercion de datos viene del modulo pokemon, y se hizo una exportacion del MoongooseModule 
//y una importacion del PokemonModule en SeedModule para que se pueda usar aqui y crear 1 pokemon por cada
//respuesta de la pokeApi
      pokemonToInsert.push({name, no})
    });
//Insercion multiple con insertMany
  await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed Executed'
  }

}
