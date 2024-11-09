import {Entity, model, property, belongsTo} from '@loopback/repository';
import {FasesTorneo} from './fases-torneo.model';

@model()
export class Grupos extends Entity {
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

  @belongsTo(() => FasesTorneo)
  fasesTorneoId: string;

  constructor(data?: Partial<Grupos>) {
    super(data);
  }
}

export interface GruposRelations {
  // describe navigational properties here
}

export type GruposWithRelations = Grupos & GruposRelations;
