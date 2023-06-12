import Joi = require('joi');
import { CRYPTOCURRENCIES, FIATS } from '../../consts';

type ExchangeRateInput = {
  getRates: {
    query: {
      crypto: string;
      fiat: string;
    };
  };
};

const customJoi = Joi.extend(joi => ({
  base: joi.array(),
  type: 'splitToArray',
  coerce: value => ({
    value: typeof value === 'string' ? value.split(',') : [value]
  })
}));

export const exchangeRateValidationSchema = {
  getRates: Joi.object<ExchangeRateInput['getRates']>({
    query: Joi.object({
      crypto: customJoi
        .splitToArray()
        .items(Joi.string().valid(...CRYPTOCURRENCIES))
        .required(),
      fiat: customJoi
        .splitToArray()
        .items(Joi.string().valid(...FIATS))
        .required()
    }).required()
  })
};
