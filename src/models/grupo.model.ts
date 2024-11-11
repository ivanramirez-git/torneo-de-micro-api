import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {EquipoGrupo} from './equipo-grupo.model';
import {Partido} from './partido.model';
import {FaseTorneo} from './fase-torneo.model';

@model()
export class Grupo extends Entity {
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
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;
  @hasMany(() => EquipoGrupo)
  equipoGrupos: EquipoGrupo[];

  @hasMany(() => Partido)
  partidos: Partido[];

  @belongsTo(() => FaseTorneo)
  faseTorneoId: string;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
