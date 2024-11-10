import {Entity, hasMany, model, property} from '@loopback/repository';
import {Grupo} from './grupo.model';

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

  @property({
    type: 'string',
  })
  torneoId?: string;

  @hasMany(() => Grupo, {keyTo: 'faseTorneoId'})
  grupos: Grupo[];

  constructor(data?: Partial<FaseTorneo>) {
    super(data);
  }
}

export interface FaseTorneoRelations {
  // describe navigational properties here
}

export type FaseTorneoWithRelations = FaseTorneo & FaseTorneoRelations;
