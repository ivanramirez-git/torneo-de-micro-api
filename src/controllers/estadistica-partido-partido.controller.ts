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
  Partido,
} from '../models';
import {EstadisticaPartidoRepository} from '../repositories';

export class EstadisticaPartidoPartidoController {
  constructor(
    @repository(EstadisticaPartidoRepository)
    public estadisticaPartidoRepository: EstadisticaPartidoRepository,
  ) { }

  @get('/estadistica-partidos/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to EstadisticaPartido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.string('id') id: typeof EstadisticaPartido.prototype.id,
  ): Promise<Partido> {
    return this.estadisticaPartidoRepository.partido(id);
  }
}
