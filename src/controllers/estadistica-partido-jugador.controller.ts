import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadisticaPartido,
  Jugador,
} from '../models';
import {EstadisticaPartidoRepository} from '../repositories';

export class EstadisticaPartidoJugadorController {
  constructor(
    @repository(EstadisticaPartidoRepository)
    public estadisticaPartidoRepository: EstadisticaPartidoRepository,
  ) { }

  @get('/estadistica-partidos/{id}/jugador', {
    responses: {
      '200': {
        description: 'Jugador belonging to EstadisticaPartido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugador(
    @param.path.string('id') id: typeof EstadisticaPartido.prototype.id,
  ): Promise<Jugador> {
    return this.estadisticaPartidoRepository.jugador(id);
  }
}
