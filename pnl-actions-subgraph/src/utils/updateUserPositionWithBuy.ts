/* eslint-disable @typescript-eslint/ban-types */

import { Address, BigInt } from '@graphprotocol/graph-ts';

import { savePositionAction } from './savePositionAction';

const updateUserPositionWithBuy = (
  user: Address,
  positionId: BigInt,
  price: BigInt,
  amount: BigInt,
  conditionId: string,
  timestamp: BigInt,
  transactionHash: string,
  blockNumber: BigInt,
  logIndex: BigInt,
  actionType: string,
): void => {
  savePositionAction(
    user,
    positionId,
    price,
    amount,
    timestamp,
    transactionHash,
    blockNumber,
    logIndex,
    actionType,
  );
};

export { updateUserPositionWithBuy };
