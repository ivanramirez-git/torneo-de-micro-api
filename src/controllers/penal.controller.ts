import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Penal} from '../models';
import {PenalRepository} from '../repositories';

export class PenalController {
  constructor(
    @repository(PenalRepository)
    public penalRepository: PenalRepository,
  ) { }

  @authenticate('jwt')
  @post('/penales')
  @response(200, {
    description: 'Penal model instance',
    content: {'application/json': {schema: getModelSchemaRef(Penal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penal, {
            title: 'NewPenal',
            exclude: ['id'],
          }),
        },
      },
    })
    penal: Omit<Penal, 'id'>,
  ): Promise<Penal> {
    return this.penalRepository.create(penal);
  }

  @get('/penales/count')
  @response(200, {
    description: 'Penal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Penal) where?: Where<Penal>,
  ): Promise<Count> {
    return this.penalRepository.count(where);
  }

  @get('/penales')
  @response(200, {
    description: 'Array of Penal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Penal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Penal) filter?: Filter<Penal>,
  ): Promise<Penal[]> {
    return this.penalRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/penales')
  @response(200, {
    description: 'Penal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penal, {partial: true}),
        },
      },
    })
    penal: Penal,
    @param.where(Penal) where?: Where<Penal>,
  ): Promise<Count> {
    return this.penalRepository.updateAll(penal, where);
  }

  @get('/penales/{id}')
  @response(200, {
    description: 'Penal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Penal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Penal, {exclude: 'where'}) filter?: FilterExcludingWhere<Penal>
  ): Promise<Penal> {
    return this.penalRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/penales/{id}')
  @response(204, {
    description: 'Penal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penal, {partial: true}),
        },
      },
    })
    penal: Penal,
  ): Promise<void> {
    await this.penalRepository.updateById(id, penal);
  }

  @authenticate('jwt')
  @put('/penales/{id}')
  @response(204, {
    description: 'Penal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() penal: Penal,
  ): Promise<void> {
    await this.penalRepository.replaceById(id, penal);
  }

  @authenticate('jwt')
  @del('/penales/{id}')
  @response(204, {
    description: 'Penal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.penalRepository.deleteById(id);
  }
}
