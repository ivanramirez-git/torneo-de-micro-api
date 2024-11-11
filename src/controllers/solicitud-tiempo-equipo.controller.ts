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
  Equipo,
} from '../models';
import {SolicitudTiempoRepository} from '../repositories';

export class SolicitudTiempoEquipoController {
  constructor(
    @repository(SolicitudTiempoRepository)
    public solicitudTiempoRepository: SolicitudTiempoRepository,
  ) { }

  @get('/solicitud-tiempos/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to SolicitudTiempo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.string('id') id: typeof SolicitudTiempo.prototype.id,
  ): Promise<Equipo> {
    return this.solicitudTiempoRepository.equipo(id);
  }
}
