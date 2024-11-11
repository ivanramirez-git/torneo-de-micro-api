import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupo,
  FaseTorneo,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoFaseTorneoController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/fase-torneo', {
    responses: {
      '200': {
        description: 'FaseTorneo belonging to Grupo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FaseTorneo),
          },
        },
      },
    },
  })
  async getFaseTorneo(
    @param.path.string('id') id: typeof Grupo.prototype.id,
  ): Promise<FaseTorneo> {
    return this.grupoRepository.faseTorneo(id);
  }
}
