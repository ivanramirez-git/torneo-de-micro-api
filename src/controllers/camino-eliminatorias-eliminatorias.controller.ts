import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CaminoEliminatorias,
  Eliminatorias,
} from '../models';
import {CaminoEliminatoriasRepository} from '../repositories';

export class CaminoEliminatoriasEliminatoriasController {
  constructor(
    @repository(CaminoEliminatoriasRepository)
    public caminoEliminatoriasRepository: CaminoEliminatoriasRepository,
  ) { }

  @get('/camino-eliminatorias/{id}/eliminatorias', {
    responses: {
      '200': {
        description: 'Eliminatorias belonging to CaminoEliminatorias',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Eliminatorias),
          },
        },
      },
    },
  })
  async getEliminatorias(
    @param.path.string('id') id: typeof CaminoEliminatorias.prototype.id,
  ): Promise<Eliminatorias> {
    return this.caminoEliminatoriasRepository.eliminatorias(id);
  }
}
