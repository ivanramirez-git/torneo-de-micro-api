import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupos,
  FasesTorneo,
} from '../models';
import {GruposRepository} from '../repositories';

export class GruposFasesTorneoController {
  constructor(
    @repository(GruposRepository)
    public gruposRepository: GruposRepository,
  ) { }

  @get('/grupos/{id}/fases-torneo', {
    responses: {
      '200': {
        description: 'FasesTorneo belonging to Grupos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FasesTorneo),
          },
        },
      },
    },
  })
  async getFasesTorneo(
    @param.path.string('id') id: typeof Grupos.prototype.id,
  ): Promise<FasesTorneo> {
    return this.gruposRepository.fasesTorneo(id);
  }
}
