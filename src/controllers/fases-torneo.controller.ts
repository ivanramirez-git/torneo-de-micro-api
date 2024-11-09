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
import {FasesTorneo} from '../models';
import {FasesTorneoRepository} from '../repositories';

export class FasesTorneoController {
  constructor(
    @repository(FasesTorneoRepository)
    public fasesTorneoRepository : FasesTorneoRepository,
  ) {}

  @post('/fases-torneos')
  @response(200, {
    description: 'FasesTorneo model instance',
    content: {'application/json': {schema: getModelSchemaRef(FasesTorneo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FasesTorneo, {
            title: 'NewFasesTorneo',
            exclude: ['id'],
          }),
        },
      },
    })
    fasesTorneo: Omit<FasesTorneo, 'id'>,
  ): Promise<FasesTorneo> {
    return this.fasesTorneoRepository.create(fasesTorneo);
  }

  @get('/fases-torneos/count')
  @response(200, {
    description: 'FasesTorneo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FasesTorneo) where?: Where<FasesTorneo>,
  ): Promise<Count> {
    return this.fasesTorneoRepository.count(where);
  }

  @get('/fases-torneos')
  @response(200, {
    description: 'Array of FasesTorneo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FasesTorneo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FasesTorneo) filter?: Filter<FasesTorneo>,
  ): Promise<FasesTorneo[]> {
    return this.fasesTorneoRepository.find(filter);
  }

  @patch('/fases-torneos')
  @response(200, {
    description: 'FasesTorneo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FasesTorneo, {partial: true}),
        },
      },
    })
    fasesTorneo: FasesTorneo,
    @param.where(FasesTorneo) where?: Where<FasesTorneo>,
  ): Promise<Count> {
    return this.fasesTorneoRepository.updateAll(fasesTorneo, where);
  }

  @get('/fases-torneos/{id}')
  @response(200, {
    description: 'FasesTorneo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FasesTorneo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FasesTorneo, {exclude: 'where'}) filter?: FilterExcludingWhere<FasesTorneo>
  ): Promise<FasesTorneo> {
    return this.fasesTorneoRepository.findById(id, filter);
  }

  @patch('/fases-torneos/{id}')
  @response(204, {
    description: 'FasesTorneo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FasesTorneo, {partial: true}),
        },
      },
    })
    fasesTorneo: FasesTorneo,
  ): Promise<void> {
    await this.fasesTorneoRepository.updateById(id, fasesTorneo);
  }

  @put('/fases-torneos/{id}')
  @response(204, {
    description: 'FasesTorneo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fasesTorneo: FasesTorneo,
  ): Promise<void> {
    await this.fasesTorneoRepository.replaceById(id, fasesTorneo);
  }

  @del('/fases-torneos/{id}')
  @response(204, {
    description: 'FasesTorneo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fasesTorneoRepository.deleteById(id);
  }
}
