import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Eliminatorias,
  FasesTorneo,
} from '../models';
import {EliminatoriasRepository} from '../repositories';

export class EliminatoriasFasesTorneoController {
  constructor(
    @repository(EliminatoriasRepository)
    public eliminatoriasRepository: EliminatoriasRepository,
  ) { }

  @get('/eliminatorias/{id}/fases-torneo', {
    responses: {
      '200': {
        description: 'FasesTorneo belonging to Eliminatorias',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FasesTorneo),
          },
        },
      },
    },
  })
  async getFasesTorneo(
    @param.path.string('id') id: typeof Eliminatorias.prototype.id,
  ): Promise<FasesTorneo> {
    return this.eliminatoriasRepository.fasesTorneo(id);
  }
}
