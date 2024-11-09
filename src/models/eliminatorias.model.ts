import {Entity, model, property, belongsTo} from '@loopback/repository';
import {FasesTorneo} from './fases-torneo.model';
import {Equipos} from './equipos.model';

@model()
export class Eliminatorias extends Entity {
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
  ronda: string;

  @belongsTo(() => FasesTorneo)
  fasesTorneoId: string;

  @belongsTo(() => Equipos)
  equiposId: string;

  constructor(data?: Partial<Eliminatorias>) {
    super(data);
  }
}

export interface EliminatoriasRelations {
  // describe navigational properties here
}

export type EliminatoriasWithRelations = Eliminatorias & EliminatoriasRelations;
