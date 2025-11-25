import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {EstadisticaPartido} from './estadistica-partido.model';
import {Grupo} from './grupo.model';
import {Jugador} from './jugador.model';
import {Lugar} from './lugar.model';
import {Penal} from './penal.model';
import {SolicitudTiempo} from './solicitud-tiempo.model';

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
    required: true,
  })
  equipoLocalId: string;

  @property({
    type: 'string',
    required: true,
  })
  equipoVisitanteId: string;

  @property({
    type: 'boolean',
    default: false,
  })
  equipoLocalSancionado?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  equipoVisitanteSancionado?: boolean;

  @hasMany(() => EstadisticaPartido)
  estadisticasPartido: EstadisticaPartido[];

  @hasMany(() => SolicitudTiempo)
  solicitudesTiempo: SolicitudTiempo[];

  @hasMany(() => Penal)
  penales: Penal[];

  @belongsTo(() => Grupo)
  grupoId: string;

  @belongsTo(() => Lugar)
  lugarId: string;

  @belongsTo(() => Jugador)
  mvpEquipoLocalId: string;

  @belongsTo(() => Jugador)
  mvpEquipoVisitanteId: string;

  @belongsTo(() => Jugador)
  capitanEquipoLocalId: string;

  @belongsTo(() => Jugador)
  capitanEquipoVisitanteId: string;

  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  // describe navigational properties here
}

export type PartidoWithRelations = Partido & PartidoRelations;
