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
  Equipos,
} from '../models';
import {EliminatoriasRepository} from '../repositories';

export class EliminatoriasEquiposController {
  constructor(
    @repository(EliminatoriasRepository)
    public eliminatoriasRepository: EliminatoriasRepository,
  ) { }

  @get('/eliminatorias/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to Eliminatorias',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof Eliminatorias.prototype.id,
  ): Promise<Equipos> {
    return this.eliminatoriasRepository.equipos(id);
  }
}
