import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cronograma,
  Partidos,
} from '../models';
import {CronogramaRepository} from '../repositories';

export class CronogramaPartidosController {
  constructor(
    @repository(CronogramaRepository)
    public cronogramaRepository: CronogramaRepository,
  ) { }

  @get('/cronogramas/{id}/partidos', {
    responses: {
      '200': {
        description: 'Partidos belonging to Cronograma',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partidos),
          },
        },
      },
    },
  })
  async getPartidos(
    @param.path.string('id') id: typeof Cronograma.prototype.id,
  ): Promise<Partidos> {
    return this.cronogramaRepository.partidos(id);
  }
}
