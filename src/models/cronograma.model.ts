import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Partidos} from './partidos.model';

@model()
export class Cronograma extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  fecha?: string;

  @property({
    type: 'date',
  })
  hora?: string;

  @belongsTo(() => Partidos)
  partidosId: string;

  constructor(data?: Partial<Cronograma>) {
    super(data);
  }
}

export interface CronogramaRelations {
  // describe navigational properties here
}

export type CronogramaWithRelations = Cronograma & CronogramaRelations;
