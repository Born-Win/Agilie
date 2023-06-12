export type KrakenConnectionResponse = {
  connectionID: number;
  event: string;
  status: string;
  version: string;
};

export type KrakenSubscriptionResponse = {
  channelID: number;
  channelName: string;
  event: string;
  pair: string;
  status: string;
  subscription: {
    name: string;
  };
};

export type KrakenEventResponse = {
  event: string;
};

export type KrakenCryptoPriceData = {
  a: [string, number, string];
  b: [string, number, string];
  c: [string, string];
  v: [string, string];
  p: [string, string];
  t: [string, string];
  l: [string, string];
  h: [string, string];
  o: [string, string];
};

export type KrakenDataResponse = [
  number, // channelID
  KrakenCryptoPriceData,
  string, // channelName
  string // pair
];
