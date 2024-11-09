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
import {EstadisticasPartido} from '../models';
import {EstadisticasPartidoRepository} from '../repositories';

export class EstadisticasPartidoController {
  constructor(
    @repository(EstadisticasPartidoRepository)
    public estadisticasPartidoRepository : EstadisticasPartidoRepository,
  ) {}

  @post('/estadisticas-partidos')
  @response(200, {
    description: 'EstadisticasPartido model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadisticasPartido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticasPartido, {
            title: 'NewEstadisticasPartido',
            exclude: ['id'],
          }),
        },
      },
    })
    estadisticasPartido: Omit<EstadisticasPartido, 'id'>,
  ): Promise<EstadisticasPartido> {
    return this.estadisticasPartidoRepository.create(estadisticasPartido);
  }

  @get('/estadisticas-partidos/count')
  @response(200, {
    description: 'EstadisticasPartido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadisticasPartido) where?: Where<EstadisticasPartido>,
  ): Promise<Count> {
    return this.estadisticasPartidoRepository.count(where);
  }

  @get('/estadisticas-partidos')
  @response(200, {
    description: 'Array of EstadisticasPartido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadisticasPartido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadisticasPartido) filter?: Filter<EstadisticasPartido>,
  ): Promise<EstadisticasPartido[]> {
    return this.estadisticasPartidoRepository.find(filter);
  }

  @patch('/estadisticas-partidos')
  @response(200, {
    description: 'EstadisticasPartido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticasPartido, {partial: true}),
        },
      },
    })
    estadisticasPartido: EstadisticasPartido,
    @param.where(EstadisticasPartido) where?: Where<EstadisticasPartido>,
  ): Promise<Count> {
    return this.estadisticasPartidoRepository.updateAll(estadisticasPartido, where);
  }

  @get('/estadisticas-partidos/{id}')
  @response(200, {
    description: 'EstadisticasPartido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadisticasPartido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadisticasPartido, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadisticasPartido>
  ): Promise<EstadisticasPartido> {
    return this.estadisticasPartidoRepository.findById(id, filter);
  }

  @patch('/estadisticas-partidos/{id}')
  @response(204, {
    description: 'EstadisticasPartido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticasPartido, {partial: true}),
        },
      },
    })
    estadisticasPartido: EstadisticasPartido,
  ): Promise<void> {
    await this.estadisticasPartidoRepository.updateById(id, estadisticasPartido);
  }

  @put('/estadisticas-partidos/{id}')
  @response(204, {
    description: 'EstadisticasPartido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadisticasPartido: EstadisticasPartido,
  ): Promise<void> {
    await this.estadisticasPartidoRepository.replaceById(id, estadisticasPartido);
  }

  @del('/estadisticas-partidos/{id}')
  @response(204, {
    description: 'EstadisticasPartido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadisticasPartidoRepository.deleteById(id);
  }
}
