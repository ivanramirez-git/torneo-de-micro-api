import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadisticasPartido,
  Jugadores,
} from '../models';
import {EstadisticasPartidoRepository} from '../repositories';

export class EstadisticasPartidoJugadoresController {
  constructor(
    @repository(EstadisticasPartidoRepository)
    public estadisticasPartidoRepository: EstadisticasPartidoRepository,
  ) { }

  @get('/estadisticas-partidos/{id}/jugadores', {
    responses: {
      '200': {
        description: 'Jugadores belonging to EstadisticasPartido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugadores),
          },
        },
      },
    },
  })
  async getJugadores(
    @param.path.string('id') id: typeof EstadisticasPartido.prototype.id,
  ): Promise<Jugadores> {
    return this.estadisticasPartidoRepository.jugadores(id);
  }
}
