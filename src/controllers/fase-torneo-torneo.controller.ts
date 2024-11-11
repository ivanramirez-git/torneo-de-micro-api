import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FaseTorneo,
  Torneo,
} from '../models';
import {FaseTorneoRepository} from '../repositories';

export class FaseTorneoTorneoController {
  constructor(
    @repository(FaseTorneoRepository)
    public faseTorneoRepository: FaseTorneoRepository,
  ) { }

  @get('/fase-torneos/{id}/torneo', {
    responses: {
      '200': {
        description: 'Torneo belonging to FaseTorneo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Torneo),
          },
        },
      },
    },
  })
  async getTorneo(
    @param.path.string('id') id: typeof FaseTorneo.prototype.id,
  ): Promise<Torneo> {
    return this.faseTorneoRepository.torneo(id);
  }
}
