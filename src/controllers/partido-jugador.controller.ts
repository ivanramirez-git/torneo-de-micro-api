
import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Jugador,
  Partido,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoJugadorController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/capitan-equipo-local', {
    responses: {
      '200': {
        description: 'Capitan equipo local belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getCapitanEquipoLocal(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Jugador> {
    return this.partidoRepository.capitanEquipoLocal(id);
  }


  @get('/partidos/{id}/capitan-equipo-visitante', {
    responses: {
      '200': {
        description: 'Capitan equipo visitante belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugador(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Jugador> {
    return this.partidoRepository.capitanEquipoVisitante(id);
  }

  @get('/partidos/{id}/jugador-mvp-equipo-local', {
    responses: {
      '200': {
        description: 'Jugador mvp equipo local belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugadorMvpEquipoLocal(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Jugador> {
    return this.partidoRepository.mvpEquipoLocal(id);
  }


  @get('/partidos/{id}/jugador-mvp-equipo-visitante', {
    responses: {
      '200': {
        description: 'Jugador mvp equipo visitante belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugadorMvpEquipoVisitante(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Jugador> {
    return this.partidoRepository.mvpEquipoVisitante(id);
  }
}
