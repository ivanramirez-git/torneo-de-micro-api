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
  Partido,
  Penal,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoPenalController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/penals', {
    responses: {
      '200': {
        description: 'Array of Partido has many Penal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Penal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Penal>,
  ): Promise<Penal[]> {
    return this.partidoRepository.penales(id).find(filter);
  }

  @post('/partidos/{id}/penals', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Penal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Partido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penal, {
            title: 'NewPenalInPartido',
            exclude: ['id'],
            optional: ['partidoId']
          }),
        },
      },
    }) penal: Omit<Penal, 'id'>,
  ): Promise<Penal> {
    return this.partidoRepository.penales(id).create(penal);
  }

  @patch('/partidos/{id}/penals', {
    responses: {
      '200': {
        description: 'Partido.Penal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penal, {partial: true}),
        },
      },
    })
    penal: Partial<Penal>,
    @param.query.object('where', getWhereSchemaFor(Penal)) where?: Where<Penal>,
  ): Promise<Count> {
    return this.partidoRepository.penales(id).patch(penal, where);
  }

  @del('/partidos/{id}/penals', {
    responses: {
      '200': {
        description: 'Partido.Penal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Penal)) where?: Where<Penal>,
  ): Promise<Count> {
    return this.partidoRepository.penales(id).delete(where);
  }
}
