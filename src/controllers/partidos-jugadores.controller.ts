import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Jugadores,
  Partidos,
} from '../models';
import {PartidosRepository} from '../repositories';

export class PartidosJugadoresController {
  constructor(
    @repository(PartidosRepository)
    public partidosRepository: PartidosRepository,
  ) { }

  @get('/partidos/{id}/jugadores-capitan-local', {
    responses: {
      '200': {
        description: 'Jugadores belonging to Partidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugadores),
          },
        },
      },
    },
  })
  async getJugadoresCapitanLocal(
    @param.path.string('id') id: typeof Partidos.prototype.id,
  ): Promise<Jugadores> {
    return this.partidosRepository.capitanLocal(id);
  }

  @get('/partidos/{id}/jugadores-capitan-visitante', {
    responses: {
      '200': {
        description: 'Jugadores belonging to Partidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugadores),
          },
        },
      },
    },
  })
  async getJugadoresCapitanVisitante(
    @param.path.string('id') id: typeof Partidos.prototype.id,
  ): Promise<Jugadores> {
    return this.partidosRepository.capitanVisitante(id);
  }

  @get('/partidos/{id}/jugadores-mvp', {
    responses: {
      '200': {
        description: 'Jugadores belonging to Partidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugadores),
          },
        },
      },
    },
  })
  async getJugadoresMvp(
    @param.path.string('id') id: typeof Partidos.prototype.id,
  ): Promise<Jugadores> {
    return this.partidosRepository.mvp(id);
  }
}
