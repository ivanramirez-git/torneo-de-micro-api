import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SolicitudesTiempo} from '../models';
import {SolicitudesTiempoRepository} from '../repositories';

export class SolicitudesTiempoController {
  constructor(
    @repository(SolicitudesTiempoRepository)
    public solicitudesTiempoRepository : SolicitudesTiempoRepository,
  ) {}

  @post('/solicitudes-tiempos')
  @response(200, {
    description: 'SolicitudesTiempo model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudesTiempo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesTiempo, {
            title: 'NewSolicitudesTiempo',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudesTiempo: Omit<SolicitudesTiempo, 'id'>,
  ): Promise<SolicitudesTiempo> {
    return this.solicitudesTiempoRepository.create(solicitudesTiempo);
  }

  @get('/solicitudes-tiempos/count')
  @response(200, {
    description: 'SolicitudesTiempo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudesTiempo) where?: Where<SolicitudesTiempo>,
  ): Promise<Count> {
    return this.solicitudesTiempoRepository.count(where);
  }

  @get('/solicitudes-tiempos')
  @response(200, {
    description: 'Array of SolicitudesTiempo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudesTiempo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudesTiempo) filter?: Filter<SolicitudesTiempo>,
  ): Promise<SolicitudesTiempo[]> {
    return this.solicitudesTiempoRepository.find(filter);
  }

  @patch('/solicitudes-tiempos')
  @response(200, {
    description: 'SolicitudesTiempo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesTiempo, {partial: true}),
        },
      },
    })
    solicitudesTiempo: SolicitudesTiempo,
    @param.where(SolicitudesTiempo) where?: Where<SolicitudesTiempo>,
  ): Promise<Count> {
    return this.solicitudesTiempoRepository.updateAll(solicitudesTiempo, where);
  }

  @get('/solicitudes-tiempos/{id}')
  @response(200, {
    description: 'SolicitudesTiempo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudesTiempo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudesTiempo, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudesTiempo>
  ): Promise<SolicitudesTiempo> {
    return this.solicitudesTiempoRepository.findById(id, filter);
  }

  @patch('/solicitudes-tiempos/{id}')
  @response(204, {
    description: 'SolicitudesTiempo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesTiempo, {partial: true}),
        },
      },
    })
    solicitudesTiempo: SolicitudesTiempo,
  ): Promise<void> {
    await this.solicitudesTiempoRepository.updateById(id, solicitudesTiempo);
  }

  @put('/solicitudes-tiempos/{id}')
  @response(204, {
    description: 'SolicitudesTiempo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudesTiempo: SolicitudesTiempo,
  ): Promise<void> {
    await this.solicitudesTiempoRepository.replaceById(id, solicitudesTiempo);
  }

  @del('/solicitudes-tiempos/{id}')
  @response(204, {
    description: 'SolicitudesTiempo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudesTiempoRepository.deleteById(id);
  }
}
