import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Equipos} from './equipos.model';

@model()
export class Jugadores extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @belongsTo(() => Equipos)
  equiposId: string;

  constructor(data?: Partial<Jugadores>) {
    super(data);
  }
}

export interface JugadoresRelations {
  // describe navigational properties here
}

export type JugadoresWithRelations = Jugadores & JugadoresRelations;
