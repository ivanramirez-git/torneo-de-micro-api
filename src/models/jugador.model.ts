import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Equipo} from './equipo.model';

@model()
export class Jugador extends Entity {
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

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  @belongsTo(() => Equipo)
  equipoId: string;

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
