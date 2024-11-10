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
import {FaseTorneo} from '../models';
import {FaseTorneoRepository} from '../repositories';

export class FaseTorneoController {
  constructor(
    @repository(FaseTorneoRepository)
    public faseTorneoRepository : FaseTorneoRepository,
  ) {}

  @post('/fase-torneos')
  @response(200, {
    description: 'FaseTorneo model instance',
    content: {'application/json': {schema: getModelSchemaRef(FaseTorneo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FaseTorneo, {
            title: 'NewFaseTorneo',
            exclude: ['id'],
          }),
        },
      },
    })
    faseTorneo: Omit<FaseTorneo, 'id'>,
  ): Promise<FaseTorneo> {
    return this.faseTorneoRepository.create(faseTorneo);
  }

  @get('/fase-torneos/count')
  @response(200, {
    description: 'FaseTorneo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FaseTorneo) where?: Where<FaseTorneo>,
  ): Promise<Count> {
    return this.faseTorneoRepository.count(where);
  }

  @get('/fase-torneos')
  @response(200, {
    description: 'Array of FaseTorneo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FaseTorneo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FaseTorneo) filter?: Filter<FaseTorneo>,
  ): Promise<FaseTorneo[]> {
    return this.faseTorneoRepository.find(filter);
  }

  @patch('/fase-torneos')
  @response(200, {
    description: 'FaseTorneo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FaseTorneo, {partial: true}),
        },
      },
    })
    faseTorneo: FaseTorneo,
    @param.where(FaseTorneo) where?: Where<FaseTorneo>,
  ): Promise<Count> {
    return this.faseTorneoRepository.updateAll(faseTorneo, where);
  }

  @get('/fase-torneos/{id}')
  @response(200, {
    description: 'FaseTorneo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FaseTorneo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FaseTorneo, {exclude: 'where'}) filter?: FilterExcludingWhere<FaseTorneo>
  ): Promise<FaseTorneo> {
    return this.faseTorneoRepository.findById(id, filter);
  }

  @patch('/fase-torneos/{id}')
  @response(204, {
    description: 'FaseTorneo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FaseTorneo, {partial: true}),
        },
      },
    })
    faseTorneo: FaseTorneo,
  ): Promise<void> {
    await this.faseTorneoRepository.updateById(id, faseTorneo);
  }

  @put('/fase-torneos/{id}')
  @response(204, {
    description: 'FaseTorneo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() faseTorneo: FaseTorneo,
  ): Promise<void> {
    await this.faseTorneoRepository.replaceById(id, faseTorneo);
  }

  @del('/fase-torneos/{id}')
  @response(204, {
    description: 'FaseTorneo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.faseTorneoRepository.deleteById(id);
  }
}
