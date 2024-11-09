import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Partidos} from './partidos.model';
import {Equipos} from './equipos.model';

@model()
export class Penales extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  gol: boolean;

  @belongsTo(() => Partidos)
  partidosId: string;

  @belongsTo(() => Equipos)
  equiposId: string;

  constructor(data?: Partial<Penales>) {
    super(data);
  }
}

export interface PenalesRelations {
  // describe navigational properties here
}

export type PenalesWithRelations = Penales & PenalesRelations;
