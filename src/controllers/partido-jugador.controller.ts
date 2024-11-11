
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

  @get('/partidos/{id}/jugador-mvp', {
    responses: {
      '200': {
        description: 'Jugador MVP belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugadorMvp(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Jugador> {
    return this.partidoRepository.mvp(id);
  }
}
