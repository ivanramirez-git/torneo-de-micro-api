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
  Grupo,
  Partido,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoPartidoController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Array of Grupo has many Partido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Partido>,
  ): Promise<Partido[]> {
    return this.grupoRepository.partidos(id).find(filter);
  }

  @post('/grupos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartidoInGrupo',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) partido: Omit<Partido, 'id'>,
  ): Promise<Partido> {
    return this.grupoRepository.partidos(id).create(partido);
  }

  @patch('/grupos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Grupo.Partido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {partial: true}),
        },
      },
    })
    partido: Partial<Partido>,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.grupoRepository.partidos(id).patch(partido, where);
  }

  @del('/grupos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Grupo.Partido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.grupoRepository.partidos(id).delete(where);
  }
}
