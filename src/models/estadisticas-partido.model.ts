import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Partidos} from './partidos.model';
import {Equipos} from './equipos.model';
import {Jugadores} from './jugadores.model';

@model()
export class EstadisticasPartido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    default: 0,
  })
  goles?: number;

  @property({
    type: 'number',
    default: 0,
  })
  faltas?: number;

  @property({
    type: 'string',
  })
  sanciones?: string;

  @property({
    type: 'number',
    default: 0,
  })
  tarjetas_azules?: number;

  @property({
    type: 'number',
    default: 0,
  })
  tarjetas_amarillas?: number;

  @property({
    type: 'number',
    default: 0,
  })
  tarjetas_rojas?: number;

  @belongsTo(() => Partidos)
  partidosId: string;

  @belongsTo(() => Equipos)
  equiposId: string;

  @belongsTo(() => Jugadores)
  jugadoresId: string;

  constructor(data?: Partial<EstadisticasPartido>) {
    super(data);
  }
}

export interface EstadisticasPartidoRelations {
  // describe navigational properties here
}

export type EstadisticasPartidoWithRelations = EstadisticasPartido & EstadisticasPartidoRelations;
