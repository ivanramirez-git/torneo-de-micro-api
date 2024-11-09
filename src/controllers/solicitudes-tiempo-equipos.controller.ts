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
  Equipos,
} from '../models';
import {SolicitudesTiempoRepository} from '../repositories';

export class SolicitudesTiempoEquiposController {
  constructor(
    @repository(SolicitudesTiempoRepository)
    public solicitudesTiempoRepository: SolicitudesTiempoRepository,
  ) { }

  @get('/solicitudes-tiempos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to SolicitudesTiempo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof SolicitudesTiempo.prototype.id,
  ): Promise<Equipos> {
    return this.solicitudesTiempoRepository.equipos(id);
  }
}
