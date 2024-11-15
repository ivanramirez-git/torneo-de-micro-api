import {Model, model, property} from '@loopback/repository';

@model()
export class Visita extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
