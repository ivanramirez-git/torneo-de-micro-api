import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {Torneo} from './torneo.model';

@model()
export class FaseTorneo extends Entity {
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
    type: 'number',
    required: true,
  })
  equiposClasificadosPorGrupo: number;

  @property({
    type: 'boolean',
    default: false,
  })
  permiteEmpates?: boolean;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;
  @hasMany(() => Grupo, {keyTo: 'faseTorneoId'})
  grupos: Grupo[];

  @belongsTo(() => Torneo)
  torneoId: string;

  constructor(data?: Partial<FaseTorneo>) {
    super(data);
  }
}

export interface FaseTorneoRelations {
  // describe navigational properties here
}

export type FaseTorneoWithRelations = FaseTorneo & FaseTorneoRelations;
