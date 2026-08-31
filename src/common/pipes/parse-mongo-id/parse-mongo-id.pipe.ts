import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({value, metadata})
    //Este pipe valida mediante el isValidObjecId de mongoose
    //si el valor es un id de Mongo
    if (!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoId`)
    }
    return value
  }
}

//Nota Importante los Pipes se crean tambien con comandos de NestJS