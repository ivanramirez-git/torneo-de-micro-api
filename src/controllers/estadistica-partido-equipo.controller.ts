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
  Equipo,
} from '../models';
import {EstadisticaPartidoRepository} from '../repositories';

export class EstadisticaPartidoEquipoController {
  constructor(
    @repository(EstadisticaPartidoRepository)
    public estadisticaPartidoRepository: EstadisticaPartidoRepository,
  ) { }

  @get('/estadistica-partidos/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to EstadisticaPartido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.string('id') id: typeof EstadisticaPartido.prototype.id,
  ): Promise<Equipo> {
    return this.estadisticaPartidoRepository.equipo(id);
  }
}
