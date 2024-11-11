import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Equipo,
  SolicitudTiempo,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoSolicitudTiempoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many SolicitudTiempo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudTiempo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudTiempo>,
  ): Promise<SolicitudTiempo[]> {
    return this.equipoRepository.solicitudesTiempo(id).find(filter);
  }

  @post('/equipos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudTiempo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Equipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {
            title: 'NewSolicitudTiempoInEquipo',
            exclude: ['id'],
            optional: ['equipoId']
          }),
        },
      },
    }) solicitudTiempo: Omit<SolicitudTiempo, 'id'>,
  ): Promise<SolicitudTiempo> {
    return this.equipoRepository.solicitudesTiempo(id).create(solicitudTiempo);
  }

  @patch('/equipos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Equipo.SolicitudTiempo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {partial: true}),
        },
      },
    })
    solicitudTiempo: Partial<SolicitudTiempo>,
    @param.query.object('where', getWhereSchemaFor(SolicitudTiempo)) where?: Where<SolicitudTiempo>,
  ): Promise<Count> {
    return this.equipoRepository.solicitudesTiempo(id).patch(solicitudTiempo, where);
  }

  @del('/equipos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Equipo.SolicitudTiempo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudTiempo)) where?: Where<SolicitudTiempo>,
  ): Promise<Count> {
    return this.equipoRepository.solicitudesTiempo(id).delete(where);
  }
}
