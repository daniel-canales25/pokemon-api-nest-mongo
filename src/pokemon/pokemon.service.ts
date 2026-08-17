import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  // Para poder conectar nuetro endpoint a la base de datos debemos 
  // debemos hacer esta configuracion en el constructor identificar el pokemonModel
  // que va a hacer un Model de moongoose que es un generico del Entity Pokemon
  // Este modelo no es injectable un provider , debemos usar el decorador InjectModel()
  //esta en al implementacion de NestJS
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}

  //La inserciones a base de datos son asincronas 
  async create(createPokemonDto: CreatePokemonDto) {
    //transforma el valor de name del pokemon a minusculas para consistencia del DB
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
      //implementacion , creacion del pokemonModel para la insercion de los datos con el DTO
      const pokemon = await this.pokemonModel.create( createPokemonDto);
      return pokemon
    } catch(error){
      if( error.code === 11000){
        throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
