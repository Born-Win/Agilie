import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../../pipes/joi';
import { ExchangeRateService } from '../services';
import { exchangeRateValidationSchema } from '../validation/schemas';
import {
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiOperation
} from '@nestjs/swagger';
import {
  HTTP_EXCEPTION_DEFAULT_RESPONSE,
  generateSuccessfulContentObject
} from '../../libs/swagger';
import { ExchangeRateReadDto } from '../dto';

@ApiTags('Exchange-rates')
@ApiExtraModels(ExchangeRateReadDto)
@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @ApiParam({
    name: 'cyrpto',
    schema: {
      type: 'string',
      example: ['BTC', 'BTC,BCH']
    }
  })
  @ApiParam({
    name: 'fiat',
    schema: {
      type: 'string',
      example: ['USD', 'USD,EUR']
    }
  })
  @ApiBadRequestResponse(HTTP_EXCEPTION_DEFAULT_RESPONSE)
  @ApiOkResponse(
    generateSuccessfulContentObject({
      rates: {
        type: 'array',
        items: {
          $ref: getSchemaPath(ExchangeRateReadDto)
        }
      }
    })
  )
  @ApiOperation({
    summary: 'Get crypto exchange rates for one or multiple pairs'
  })
  @UsePipes(new JoiValidationPipe(exchangeRateValidationSchema.getRates))
  @Get()
  getRates(@Query() query: { crypto: [string]; fiat: [string] }) {
    const result = this.exchangeRateService.getRates(
      query.crypto,
      query.fiat,
      'current'
    );

    return {
      rates: result
    };
  }
}
