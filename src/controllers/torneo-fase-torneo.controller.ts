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
  Torneo,
  FaseTorneo,
} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoFaseTorneoController {
  constructor(
    @repository(TorneoRepository) protected torneoRepository: TorneoRepository,
  ) { }

  @get('/torneos/{id}/fase-torneos', {
    responses: {
      '200': {
        description: 'Array of Torneo has many FaseTorneo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FaseTorneo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FaseTorneo>,
  ): Promise<FaseTorneo[]> {
    return this.torneoRepository.fasesTorneo(id).find(filter);
  }

  @post('/torneos/{id}/fase-torneos', {
    responses: {
      '200': {
        description: 'Torneo model instance',
        content: {'application/json': {schema: getModelSchemaRef(FaseTorneo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torneo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FaseTorneo, {
            title: 'NewFaseTorneoInTorneo',
            exclude: ['id'],
            optional: ['torneoId']
          }),
        },
      },
    }) faseTorneo: Omit<FaseTorneo, 'id'>,
  ): Promise<FaseTorneo> {
    return this.torneoRepository.fasesTorneo(id).create(faseTorneo);
  }

  @patch('/torneos/{id}/fase-torneos', {
    responses: {
      '200': {
        description: 'Torneo.FaseTorneo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FaseTorneo, {partial: true}),
        },
      },
    })
    faseTorneo: Partial<FaseTorneo>,
    @param.query.object('where', getWhereSchemaFor(FaseTorneo)) where?: Where<FaseTorneo>,
  ): Promise<Count> {
    return this.torneoRepository.fasesTorneo(id).patch(faseTorneo, where);
  }

  @del('/torneos/{id}/fase-torneos', {
    responses: {
      '200': {
        description: 'Torneo.FaseTorneo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FaseTorneo)) where?: Where<FaseTorneo>,
  ): Promise<Count> {
    return this.torneoRepository.fasesTorneo(id).delete(where);
  }
}
