import {Entity, model, property} from '@loopback/repository';

@model()
export class EquipoGrupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;


  constructor(data?: Partial<EquipoGrupo>) {
    super(data);
  }
}

export interface EquipoGrupoRelations {
  // describe navigational properties here
}

export type EquipoGrupoWithRelations = EquipoGrupo & EquipoGrupoRelations;
