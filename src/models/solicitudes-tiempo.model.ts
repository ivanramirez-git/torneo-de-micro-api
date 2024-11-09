import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Partidos} from './partidos.model';
import {Equipos} from './equipos.model';

@model()
export class SolicitudesTiempo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  periodo: number;

  @property({
    type: 'number',
    required: true,
  })
  minuto: number;

  @belongsTo(() => Partidos)
  partidosId: string;

  @belongsTo(() => Equipos)
  equiposId: string;

  constructor(data?: Partial<SolicitudesTiempo>) {
    super(data);
  }
}

export interface SolicitudesTiempoRelations {
  // describe navigational properties here
}

export type SolicitudesTiempoWithRelations = SolicitudesTiempo & SolicitudesTiempoRelations;
