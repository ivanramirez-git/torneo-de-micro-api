import {Entity, hasMany, model, property} from '@loopback/repository';
import {Jugador} from './jugador.model';
import {Partido} from './partido.model';
import {Grupo} from './grupo.model';
import {EquipoGrupo} from './equipo-grupo.model';
import {SolicitudTiempo} from './solicitud-tiempo.model';

@model()
export class Equipo extends Entity {
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
    default: '#FFFFFF',
  })
  color?: string;

  @property({
    type: 'string',
  })
  escudoUrl?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  @hasMany(() => Jugador)
  jugadores: Jugador[];

  @hasMany(() => Partido, {keyTo: 'equipoLocalId'})
  partidosEquipoLocal: Partido[];

  @hasMany(() => Partido, {keyTo: 'equipoVisitanteId'})
  partidosEquipoVisitante: Partido[];

  @hasMany(() => Grupo, {through: {model: () => EquipoGrupo}})
  grupos: Grupo[];

  @hasMany(() => SolicitudTiempo)
  solicitudesTiempo: SolicitudTiempo[];

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
