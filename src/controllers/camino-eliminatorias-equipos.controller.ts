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
  Equipos,
} from '../models';
import {CaminoEliminatoriasRepository} from '../repositories';

export class CaminoEliminatoriasEquiposController {
  constructor(
    @repository(CaminoEliminatoriasRepository)
    public caminoEliminatoriasRepository: CaminoEliminatoriasRepository,
  ) { }

  @get('/camino-eliminatorias/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to CaminoEliminatorias',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof CaminoEliminatorias.prototype.id,
  ): Promise<Equipos> {
    return this.caminoEliminatoriasRepository.equipos(id);
  }
}
