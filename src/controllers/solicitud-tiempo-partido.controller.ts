import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudTiempo,
  Partido,
} from '../models';
import {SolicitudTiempoRepository} from '../repositories';

export class SolicitudTiempoPartidoController {
  constructor(
    @repository(SolicitudTiempoRepository)
    public solicitudTiempoRepository: SolicitudTiempoRepository,
  ) { }

  @get('/solicitud-tiempos/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to SolicitudTiempo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.string('id') id: typeof SolicitudTiempo.prototype.id,
  ): Promise<Partido> {
    return this.solicitudTiempoRepository.partido(id);
  }
}
