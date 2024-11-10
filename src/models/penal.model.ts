import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
  })
  partidoId?: string;

  constructor(data?: Partial<Penal>) {
    super(data);
  }
}

export interface PenalRelations {
  // describe navigational properties here
}

export type PenalWithRelations = Penal & PenalRelations;
