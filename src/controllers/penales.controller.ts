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
import {Penales} from '../models';
import {PenalesRepository} from '../repositories';

export class PenalesController {
  constructor(
    @repository(PenalesRepository)
    public penalesRepository : PenalesRepository,
  ) {}

  @post('/penales')
  @response(200, {
    description: 'Penales model instance',
    content: {'application/json': {schema: getModelSchemaRef(Penales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penales, {
            title: 'NewPenales',
            exclude: ['id'],
          }),
        },
      },
    })
    penales: Omit<Penales, 'id'>,
  ): Promise<Penales> {
    return this.penalesRepository.create(penales);
  }

  @get('/penales/count')
  @response(200, {
    description: 'Penales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Penales) where?: Where<Penales>,
  ): Promise<Count> {
    return this.penalesRepository.count(where);
  }

  @get('/penales')
  @response(200, {
    description: 'Array of Penales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Penales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Penales) filter?: Filter<Penales>,
  ): Promise<Penales[]> {
    return this.penalesRepository.find(filter);
  }

  @patch('/penales')
  @response(200, {
    description: 'Penales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penales, {partial: true}),
        },
      },
    })
    penales: Penales,
    @param.where(Penales) where?: Where<Penales>,
  ): Promise<Count> {
    return this.penalesRepository.updateAll(penales, where);
  }

  @get('/penales/{id}')
  @response(200, {
    description: 'Penales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Penales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Penales, {exclude: 'where'}) filter?: FilterExcludingWhere<Penales>
  ): Promise<Penales> {
    return this.penalesRepository.findById(id, filter);
  }

  @patch('/penales/{id}')
  @response(204, {
    description: 'Penales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penales, {partial: true}),
        },
      },
    })
    penales: Penales,
  ): Promise<void> {
    await this.penalesRepository.updateById(id, penales);
  }

  @put('/penales/{id}')
  @response(204, {
    description: 'Penales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() penales: Penales,
  ): Promise<void> {
    await this.penalesRepository.replaceById(id, penales);
  }

  @del('/penales/{id}')
  @response(204, {
    description: 'Penales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.penalesRepository.deleteById(id);
  }
}
