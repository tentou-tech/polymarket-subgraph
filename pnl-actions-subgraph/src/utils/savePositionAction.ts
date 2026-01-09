/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { PositionAction } from '../types/schema';

export function savePositionAction(
  user: Address,
  positionId: BigInt,
  price: BigInt,
  amount: BigInt,
  timestamp: BigInt,
  transactionHash: string,
  blockNumber: BigInt,
  logIndex: BigInt,
  actionType: string,
  source: string,
  index: BigInt,
): void {
  const actionId =
    transactionHash + '-' + logIndex.toString() + '-' + positionId.toString();
  const action = new PositionAction(actionId);
  action.user = user.toHexString();
  action.tokenId = positionId;
  action.type = actionType;
  action.amount = amount;
  action.price = price;
  action.timestamp = timestamp;
  action.block = blockNumber;
  action.transactionHash = transactionHash;
  action.logIndex = logIndex;
  action.source = source;
  action.index = index;
  action.save();
}
