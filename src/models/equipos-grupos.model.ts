import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Grupos} from './grupos.model';
import {Equipos} from './equipos.model';

@model()
export class EquiposGrupos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Grupos)
  gruposId: string;

  @belongsTo(() => Equipos)
  equiposId: string;

  constructor(data?: Partial<EquiposGrupos>) {
    super(data);
  }
}

export interface EquiposGruposRelations {
  // describe navigational properties here
}

export type EquiposGruposWithRelations = EquiposGrupos & EquiposGruposRelations;
