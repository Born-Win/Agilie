import axios from 'axios';
import config = require('config');
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { App } from '../../../src/app/app';
import { CRYPTOCURRENCIES, FIATS } from '../../../src/consts';

describe('Exchange-rates API', () => {
  const PORT = process.env.PORT || 3000;
  const exchangeRatesApi = `${config.get('apiDomain')}/exchange-rates`;
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await App.createApp();
    await app.listen(PORT);
  });

  describe('Get one pair', () => {
    it('Should return single pair by one cyrpto and fiat', async () => {
      const crypto = CRYPTOCURRENCIES[0];
      const fiat = FIATS[0];

      const result = await axios.get(exchangeRatesApi, {
        params: {
          crypto,
          fiat
        }
      });
      expect(result.status).toEqual(HttpStatus.OK);
      expect(result.data.rates).toHaveLength(1);
      expect(result.data.rates[0]).toHaveProperty('pair');
      expect(result.data.rates[0]).toHaveProperty('rate');
    });

    it('Should return Bad Request error', async () => {
      const fiat = FIATS[0];

      const result = await axios.get(exchangeRatesApi, {
        params: {
          fiat // crypto not added
        },
        validateStatus: null
      });
      expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Get multiple pairs', () => {
    it('Should return multiple pairs by one crypto and multiple fiats', async () => {
      const crypto = CRYPTOCURRENCIES[0];
      const fiats = `${FIATS[0]},${FIATS[1]}`;

      const result = await axios.get(exchangeRatesApi, {
        params: {
          crypto,
          fiat: fiats
        }
      });
      expect(result.status).toEqual(HttpStatus.OK);
      expect(result.data.rates).toHaveLength(2);
    });

    it('Should return multiple pairs by multiple crypto and one fiat', async () => {
      const crypto = `${CRYPTOCURRENCIES[0]},${CRYPTOCURRENCIES[1]}`;
      const fiat = FIATS[0];

      const result = await axios.get(exchangeRatesApi, {
        params: {
          crypto,
          fiat
        }
      });
      expect(result.status).toEqual(HttpStatus.OK);
      expect(result.data.rates).toHaveLength(2);
    });

    it('Should return Bad Request error', async () => {
      const crypto = `${CRYPTOCURRENCIES[0]};${CRYPTOCURRENCIES[1]}`; // wrong delimiter
      const fiat = FIATS[0];

      const result = await axios.get(exchangeRatesApi, {
        params: {
          crypto,
          fiat
        },
        validateStatus: null
      });
      expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });
});
