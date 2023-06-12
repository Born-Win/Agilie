import config = require('config');
import WebSocket = require('ws');
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  KrakenConnectionResponse,
  KrakenSubscriptionResponse,
  KrakenEventResponse,
  KrakenDataResponse
} from './types';
import { ExchangeRateService } from '../../exchange-rates/services';
import { ExchangeRateStoreDto } from '../../exchange-rates/dto';

@Injectable()
export class KrakenSocketClientProvider implements OnModuleInit {
  private socket: WebSocket;
  private readonly reconnectInterval: number;
  private reconnectAttempts: number;

  constructor(private readonly exchangeRateService: ExchangeRateService) {
    this.reconnectInterval = config.get<number>('kraken.reconnectInterval');
    this.reconnectAttempts = config.get<number>('kraken.reconnectAttempts');
  }

  onModuleInit() {
    this.connectToSocket();
    this.registerConsumerEvents();
  }

  private connectToSocket() {
    this.socket = new WebSocket(config.get<string>('kraken.websoketUrl'));
  }

  private registerConsumerEvents() {
    this.socket.on('open', () => {
      console.log('Socket connected');
      const msg = JSON.stringify({
        event: 'subscribe',
        subscription: config.get<{ name: string }>('kraken.subscription'),
        pair: this.exchangeRateService.generatePairs()
      });
      this.socket.send(msg);
    });

    this.socket.on('message', response => {
      const parsedResponse = JSON.parse(response.toString()) as
        | KrakenConnectionResponse
        | KrakenSubscriptionResponse
        | KrakenEventResponse
        | KrakenDataResponse;

      if (Array.isArray(parsedResponse)) {
        this.exchangeRateService.savePair(
          new ExchangeRateStoreDto(parsedResponse)
        );
      }
    });

    this.socket.on('error', err => {
      console.log(err);
    });

    this.socket.on('close', () => {
      console.log('Socket closed');

      if (!this.reconnectAttempts) {
        throw new Error('Failed to connect to Kraken WebSocket API');
      }
      setTimeout(() => {
        this.connectToSocket();
        this.registerConsumerEvents();
        this.reconnectAttempts--;
      }, this.reconnectInterval);
    });
  }
}
