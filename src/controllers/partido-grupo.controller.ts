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
  Grupo,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoGrupoController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Grupo),
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.string('id') id: typeof Partido.prototype.id,
  ): Promise<Grupo> {
    return this.partidoRepository.grupo(id);
  }
}
