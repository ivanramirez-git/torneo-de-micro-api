import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Partido} from './partido.model';
import {Equipo} from './equipo.model';

@model()
export class Penal extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  gol: boolean;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  @belongsTo(() => Partido)
  partidoId: string;

  @belongsTo(() => Equipo)
  equipoId: string;

  constructor(data?: Partial<Penal>) {
    super(data);
  }
}

export interface PenalRelations {
  // describe navigational properties here
}

export type PenalWithRelations = Penal & PenalRelations;
