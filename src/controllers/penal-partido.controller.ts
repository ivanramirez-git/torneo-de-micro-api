import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Penal,
  Partido,
} from '../models';
import {PenalRepository} from '../repositories';

export class PenalPartidoController {
  constructor(
    @repository(PenalRepository)
    public penalRepository: PenalRepository,
  ) { }

  @get('/penals/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to Penal',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.string('id') id: typeof Penal.prototype.id,
  ): Promise<Partido> {
    return this.penalRepository.partido(id);
  }
}
