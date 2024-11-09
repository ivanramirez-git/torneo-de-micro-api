import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Equipos} from './equipos.model';
import {Jugadores} from './jugadores.model';

@model()
export class Partidos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  lugar?: string;

  @belongsTo(() => Equipos)
  equipoLocalId: string;

  @belongsTo(() => Equipos)
  equipoVisitanteId: string;

  @belongsTo(() => Jugadores)
  capitanLocalId: string;

  @belongsTo(() => Jugadores)
  capitanVisitanteId: string;

  @belongsTo(() => Jugadores)
  mvpId: string;

  constructor(data?: Partial<Partidos>) {
    super(data);
  }
}

export interface PartidosRelations {
  // describe navigational properties here
}

export type PartidosWithRelations = Partidos & PartidosRelations;
