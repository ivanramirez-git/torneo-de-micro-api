import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Penales,
  Equipos,
} from '../models';
import {PenalesRepository} from '../repositories';

export class PenalesEquiposController {
  constructor(
    @repository(PenalesRepository)
    public penalesRepository: PenalesRepository,
  ) { }

  @get('/penales/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to Penales',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof Penales.prototype.id,
  ): Promise<Equipos> {
    return this.penalesRepository.equipos(id);
  }
}
