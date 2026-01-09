import { BigInt } from '@graphprotocol/graph-ts';
import { OrderFilled } from './types/Exchange/Exchange';

import { parseOrderFilled } from './utils/parseOrderFilled';
import { updateUserPositionWithBuy } from './utils/updateUserPositionWithBuy';
import { updateUserPositionWithSell } from './utils/updateUserPositionWithSell';

import { COLLATERAL_SCALE, TradeType } from '../../common/constants';
import { Position } from './types/schema';

/**
 * Handles individual OrderFilled events
event OrderFilled(
    bytes32 indexed orderHash,
    address indexed maker,
    address indexed taker,
    uint256 makerAssetId,
    uint256 takerAssetId,
    uint256 makerAmountFilled,
    uint256 takerAmountFilled,
    uint256 fee
);
 * @param event
 */
export function handleOrderFilled(event: OrderFilled): void {
  const order = parseOrderFilled(event);

  // dollars per share
  const price = order.quoteAmount.times(COLLATERAL_SCALE).div(order.baseAmount);

  const position = Position.load(order.positionId.toString());
  const conditionId = position ? position.conditionId : '';

  if (order.side == TradeType.BUY) {
    updateUserPositionWithBuy(
      order.account,
      order.positionId,
      price,
      order.baseAmount,
      conditionId,
      event.block.timestamp,
      event.transaction.hash.toHexString(),
      event.block.number,
      event.logIndex,
      'Buy',
      'handleOrderFilled-Buy',
      BigInt.fromI32(0),
    );
  } else {
    updateUserPositionWithSell(
      order.account,
      order.positionId,
      price,
      order.baseAmount,
      conditionId,
      event.block.timestamp,
      event.transaction.hash.toHexString(),
      event.block.number,
      event.logIndex,
      'Sell',
      'handleOrderFilled-Sell',
      BigInt.fromI32(0),
    );
  }
}
