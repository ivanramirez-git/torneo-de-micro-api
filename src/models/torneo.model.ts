import {Entity, model, property, hasMany} from '@loopback/repository';
import {FaseTorneo} from './fase-torneo.model';

@model()
export class Torneo extends Entity {
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
    type: 'string',
    default: '#FFFFFF',
  })
  color?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  @hasMany(() => FaseTorneo)
  fasesTorneo: FaseTorneo[];

  constructor(data?: Partial<Torneo>) {
    super(data);
  }
}

export interface TorneoRelations {
  // describe navigational properties here
}

export type TorneoWithRelations = Torneo & TorneoRelations;
