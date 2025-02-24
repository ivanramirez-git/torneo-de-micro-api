import {Entity, model, property} from '@loopback/repository';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  fechaVisita?: string;

  @property({
    type: 'string',
  })
  url?: string;

  @property({
    type: 'object',
  })
  headers?: object;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
