import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Eliminatorias} from './eliminatorias.model';
import {Equipos} from './equipos.model';

@model()
export class CaminoEliminatorias extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  resultado?: string;

  @belongsTo(() => Eliminatorias)
  eliminatoriasId: string;

  @belongsTo(() => Equipos)
  equiposId: string;

  constructor(data?: Partial<CaminoEliminatorias>) {
    super(data);
  }
}

export interface CaminoEliminatoriasRelations {
  // describe navigational properties here
}

export type CaminoEliminatoriasWithRelations = CaminoEliminatorias & CaminoEliminatoriasRelations;
