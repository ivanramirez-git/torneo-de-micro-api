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
import {Equipo} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) { }

  @authenticate('jwt')
  @post('/equipos')
  @response(200, {
    description: 'Equipo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipo',
            exclude: ['id'],
          }),
        },
      },
    })
    equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.equipoRepository.create(equipo);
  }

  @get('/equipos/count')
  @response(200, {
    description: 'Equipo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Equipo) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.equipoRepository.count(where);
  }

  @get('/equipos')
  @response(200, {
    description: 'Array of Equipo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Equipo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Equipo) filter?: Filter<Equipo>,
  ): Promise<Equipo[]> {
    return this.equipoRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/equipos')
  @response(200, {
    description: 'Equipo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Equipo,
    @param.where(Equipo) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.equipoRepository.updateAll(equipo, where);
  }

  @get('/equipos/{id}')
  @response(200, {
    description: 'Equipo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Equipo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Equipo, {exclude: 'where'}) filter?: FilterExcludingWhere<Equipo>
  ): Promise<Equipo> {
    return this.equipoRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/equipos/{id}')
  @response(204, {
    description: 'Equipo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Equipo,
  ): Promise<void> {
    await this.equipoRepository.updateById(id, equipo);
  }

  @authenticate('jwt')
  @put('/equipos/{id}')
  @response(204, {
    description: 'Equipo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() equipo: Equipo,
  ): Promise<void> {
    await this.equipoRepository.replaceById(id, equipo);
  }

  @authenticate('jwt')
  @del('/equipos/{id}')
  @response(204, {
    description: 'Equipo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.equipoRepository.deleteById(id);
  }
}
