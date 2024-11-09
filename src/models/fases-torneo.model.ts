import {Entity, model, property} from '@loopback/repository';

@model()
export class FasesTorneo extends Entity {
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
    required: true,
    jsonSchema: {
      enum: ['fase de grupos', 'eliminatoria'],
    },
  })
  tipo: string;


  constructor(data?: Partial<FasesTorneo>) {
    super(data);
  }
}

export interface FasesTorneoRelations {
  // describe navigational properties here
}

export type FasesTorneoWithRelations = FasesTorneo & FasesTorneoRelations;
