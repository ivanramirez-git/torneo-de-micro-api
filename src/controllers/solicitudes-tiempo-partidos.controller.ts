import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudesTiempo,
  Partidos,
} from '../models';
import {SolicitudesTiempoRepository} from '../repositories';

export class SolicitudesTiempoPartidosController {
  constructor(
    @repository(SolicitudesTiempoRepository)
    public solicitudesTiempoRepository: SolicitudesTiempoRepository,
  ) { }

  @get('/solicitudes-tiempos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Partidos belonging to SolicitudesTiempo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partidos),
          },
        },
      },
    },
  })
  async getPartidos(
    @param.path.string('id') id: typeof SolicitudesTiempo.prototype.id,
  ): Promise<Partidos> {
    return this.solicitudesTiempoRepository.partidos(id);
  }
}
