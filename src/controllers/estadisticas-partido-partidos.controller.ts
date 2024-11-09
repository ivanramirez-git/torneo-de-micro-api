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
  Partidos,
} from '../models';
import {EstadisticasPartidoRepository} from '../repositories';

export class EstadisticasPartidoPartidosController {
  constructor(
    @repository(EstadisticasPartidoRepository)
    public estadisticasPartidoRepository: EstadisticasPartidoRepository,
  ) { }

  @get('/estadisticas-partidos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Partidos belonging to EstadisticasPartido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partidos),
          },
        },
      },
    },
  })
  async getPartidos(
    @param.path.string('id') id: typeof EstadisticasPartido.prototype.id,
  ): Promise<Partidos> {
    return this.estadisticasPartidoRepository.partidos(id);
  }
}
