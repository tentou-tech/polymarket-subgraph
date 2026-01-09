/* eslint-disable @typescript-eslint/ban-types */
import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { Condition, Position } from '../types/schema';
import { getPositionId } from '../../../common';

// does not save the condition
const createCondition = (conditionId: Bytes, negRisk: boolean): Condition => {
  let condition = Condition.load(conditionId.toHexString());
  if (condition != null) {
    return condition;
  }

  condition = new Condition(conditionId.toHexString());
  condition.payoutDenominator = BigInt.zero();
  condition.payoutNumerators = [];
  condition.negRisk = negRisk;

  const positionIds: BigInt[] = [];
  for (let i = 0; i < 2; i++) {
    // @ts-expect-error Cannot find name 'u8'.
    const positionId = getPositionId(conditionId, <u8>i, negRisk);
    positionIds.push(positionId);

    const position = new Position(positionId.toString());
    position.conditionId = conditionId.toHexString();
    position.save();
  }
  condition.positionIds = positionIds;

  return condition;
};

export { createCondition };
