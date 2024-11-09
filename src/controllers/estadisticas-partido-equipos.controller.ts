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
  Equipos,
} from '../models';
import {EstadisticasPartidoRepository} from '../repositories';

export class EstadisticasPartidoEquiposController {
  constructor(
    @repository(EstadisticasPartidoRepository)
    public estadisticasPartidoRepository: EstadisticasPartidoRepository,
  ) { }

  @get('/estadisticas-partidos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to EstadisticasPartido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof EstadisticasPartido.prototype.id,
  ): Promise<Equipos> {
    return this.estadisticasPartidoRepository.equipos(id);
  }
}
