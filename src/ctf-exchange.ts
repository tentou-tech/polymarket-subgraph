import { OrdersMatched as OrdersMatchedEvent } from '../generated/CTFExchange/CTFExchange';
import { log } from '@graphprotocol/graph-ts';
import { createEventOnchain } from './utils';

export function handleOrdersMatched(event: OrdersMatchedEvent): void {
  log.info('Handling OrdersMatched event', []);
  createEventOnchain(event, 'OrdersMatched');
}