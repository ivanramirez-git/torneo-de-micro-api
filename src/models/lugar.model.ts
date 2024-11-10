import {Entity, model, property} from '@loopback/repository';

@model()
export class Lugar extends Entity {
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
  })
  direccion?: string;

  @property({
    type: 'number',
  })
  capacidad?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;


  constructor(data?: Partial<Lugar>) {
    super(data);
  }
}

export interface LugarRelations {
  // describe navigational properties here
}

export type LugarWithRelations = Lugar & LugarRelations;
