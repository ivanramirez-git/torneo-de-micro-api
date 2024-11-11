import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
    required: true,
  })
  partidoId: string;

  @property({
    type: 'string',
    required: true,
  })
  equipoId: string;

  constructor(data?: Partial<SolicitudTiempo>) {
    super(data);
  }
}

export interface SolicitudTiempoRelations {
  // describe navigational properties here
}

export type SolicitudTiempoWithRelations = SolicitudTiempo & SolicitudTiempoRelations;
