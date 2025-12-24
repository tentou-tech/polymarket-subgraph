import {
  OrdersMatched as OrdersMatchedEvent,
  TokenRegistered as TokenRegisteredEvent,
  OrderFilled as OrderFilledEvent,
} from '../generated/CTFExchange/CTFExchange';
import { log } from '@graphprotocol/graph-ts';
import { createEventOnchain } from './utils';
import {
  TokenRegistered,
  OrderFilled,
  OrdersMatched,
} from '../generated/schema';

export function handleTokenRegistered(event: TokenRegisteredEvent): void {
  log.info('Handling TokenRegistered event', []);
  let entity = new TokenRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token0 = event.params.token0;
  entity.token1 = event.params.token1;
  entity.conditionId = event.params.conditionId;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOrderFilled(event: OrderFilledEvent): void {
  log.info('Handling OrderFilled event', []);
  let entity = new OrderFilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.orderHash = event.params.orderHash;
  entity.maker = event.params.maker;
  entity.taker = event.params.taker;
  entity.makerAssetId = event.params.makerAssetId;
  entity.takerAssetId = event.params.takerAssetId;
  entity.makerAmountFilled = event.params.makerAmountFilled;
  entity.takerAmountFilled = event.params.takerAmountFilled;
  entity.fee = event.params.fee;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOrdersMatched(event: OrdersMatchedEvent): void {
  log.info('Handling OrdersMatched event', []);
  let entity = new OrdersMatched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.takerOrderHash = event.params.takerOrderHash;
  entity.takerOrderMaker = event.params.takerOrderMaker;
  entity.makerAssetId = event.params.makerAssetId;
  entity.takerAssetId = event.params.takerAssetId;
  entity.makerAmountFilled = event.params.makerAmountFilled;
  entity.takerAmountFilled = event.params.takerAmountFilled;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
