import {authenticate} from '@loopback/authentication';
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
  FaseTorneo,
  Grupo,
} from '../models';
import {FaseTorneoRepository} from '../repositories';

export class FaseTorneoGrupoController {
  constructor(
    @repository(FaseTorneoRepository) protected faseTorneoRepository: FaseTorneoRepository,
  ) { }

  @get('/fase-torneos/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of FaseTorneo has many Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.faseTorneoRepository.grupos(id).find(filter);
  }

  @authenticate('jwt')
  @post('/fase-torneos/{id}/grupos', {
    responses: {
      '200': {
        description: 'FaseTorneo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof FaseTorneo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInFaseTorneo',
            exclude: ['id'],
            optional: ['faseTorneoId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.faseTorneoRepository.grupos(id).create(grupo);
  }

  @authenticate('jwt')
  @patch('/fase-torneos/{id}/grupos', {
    responses: {
      '200': {
        description: 'FaseTorneo.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.faseTorneoRepository.grupos(id).patch(grupo, where);
  }

  @authenticate('jwt')
  @del('/fase-torneos/{id}/grupos', {
    responses: {
      '200': {
        description: 'FaseTorneo.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.faseTorneoRepository.grupos(id).delete(where);
  }
}
