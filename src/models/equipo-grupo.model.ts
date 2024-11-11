import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Grupo} from './grupo.model';

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

  @belongsTo(() => Grupo)
  grupoId: string;

  @belongsTo(() => Equipo)
  equipoId: string;

  constructor(data?: Partial<EquipoGrupo>) {
    super(data);
  }
}

export interface EquipoGrupoRelations {
  // describe navigational properties here
}

export type EquipoGrupoWithRelations = EquipoGrupo & EquipoGrupoRelations;
