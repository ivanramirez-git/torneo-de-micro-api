import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Partido} from './partido.model';

@model()
export class SolicitudTiempo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  periodo?: number;

  @property({
    type: 'date',
  })
  minuto?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;
  @belongsTo(() => Equipo)
  equipoId: string;

  @belongsTo(() => Partido)
  partidoId: string;

  constructor(data?: Partial<SolicitudTiempo>) {
    super(data);
  }
}

export interface SolicitudTiempoRelations {
  // describe navigational properties here
}

export type SolicitudTiempoWithRelations = SolicitudTiempo & SolicitudTiempoRelations;
