import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
//Tipar como Document nuestra Clase Schema ayuda a TypeScript con los tipos y autocompletado
// aparte obtiene todos los metodos utiles de Documents de mongoose
import { Document } from "mongoose";


//Decorador para los Schemas de nestJS que define las tablas en Mongo
@Schema()
export class Pokemon extends Document {

    // id : string mongo ya lo crea

    //Decorador de propiedades de la columna name
    @Prop({
        unique: true,
        index: true, 
    })
    name: string;


    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

// Esta exportacion se usa en pokemon.module para su utilizacion en la app
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);