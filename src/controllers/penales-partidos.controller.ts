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
  Partidos,
} from '../models';
import {PenalesRepository} from '../repositories';

export class PenalesPartidosController {
  constructor(
    @repository(PenalesRepository)
    public penalesRepository: PenalesRepository,
  ) { }

  @get('/penales/{id}/partidos', {
    responses: {
      '200': {
        description: 'Partidos belonging to Penales',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partidos),
          },
        },
      },
    },
  })
  async getPartidos(
    @param.path.string('id') id: typeof Penales.prototype.id,
  ): Promise<Partidos> {
    return this.penalesRepository.partidos(id);
  }
}
