import {Entity, model, property, hasMany} from '@loopback/repository';
import {EquipoGrupo} from './equipo-grupo.model';
import {Partido} from './partido.model';

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

  @property({
    type: 'string',
  })
  faseTorneoId?: string;

  @hasMany(() => EquipoGrupo)
  equipoGrupos: EquipoGrupo[];

  @hasMany(() => Partido)
  partidos: Partido[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
