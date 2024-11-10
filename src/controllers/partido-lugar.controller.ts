import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Partido,
  Lugar,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoLugarController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/lugar', {
    responses: {
      '200': {
        description: 'Lugar belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lugar),
          },
        },
      },
    },
  })
  async getLugar(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Lugar> {
    return this.partidoRepository.lugar(id);
  }
}
