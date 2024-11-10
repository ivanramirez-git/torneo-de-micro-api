import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Lugar} from './lugar.model';
import {EstadisticaPartido} from './estadistica-partido.model';
import {SolicitudTiempo} from './solicitud-tiempo.model';
import {Penal} from './penal.model';

@model()
export class Partido extends Entity {
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
  fechaProgramacion: string;

  @property({
    type: 'date',
    required: true,
  })
  horaProgramacion: string;

  @property({
    type: 'date',
  })
  horaInicioPrimerTiempo?: string;

  @property({
    type: 'date',
  })
  horaFinPrimerTiempo?: string;

  @property({
    type: 'date',
  })
  horaInicioSegundoTiempo?: string;

  @property({
    type: 'date',
  })
  horaFinSegundoTiempo?: string;

  @property({
    type: 'date',
  })
  horaInicioTiempoExtra1?: string;

  @property({
    type: 'date',
  })
  horaFinTiempoExtra1?: string;

  @property({
    type: 'date',
  })
  horaInicioTiempoExtra2?: string;

  @property({
    type: 'date',
  })
  horaFinTiempoExtra2?: string;

  @property({
    type: 'date',
  })
  horaInicioPenales?: string;

  @property({
    type: 'date',
  })
  horaFinPenales?: string;

  @property({
    type: 'date',
  })
  horaFinPartido?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  equipoAId?: string;

  @property({
    type: 'string',
  })
  equipoLocalId?: string;

  @property({
    type: 'string',
  })
  equipoVisitanteId?: string;

  @property({
    type: 'string',
  })
  grupoId?: string;

  @belongsTo(() => Lugar)
  lugarId: string;

  @hasMany(() => EstadisticaPartido)
  estadisticasPartido: EstadisticaPartido[];

  @hasMany(() => SolicitudTiempo)
  solicitudesTiempo: SolicitudTiempo[];

  @hasMany(() => Penal)
  penales: Penal[];

  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  // describe navigational properties here
}

export type PartidoWithRelations = Partido & PartidoRelations;
