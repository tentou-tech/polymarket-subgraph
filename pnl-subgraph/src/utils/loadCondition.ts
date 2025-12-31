import { Bytes } from '@graphprotocol/graph-ts';

import { Condition, Position } from '../types/schema';

const loadCondition = (conditionId: Bytes): Condition | null => {
  const condition = Condition.load(conditionId.toHexString());

  if (condition == null) {
    return null;
  }

  // lazily create position entities if they don't exist
  for (let i = 0; i < condition.positionIds.length; i++) {
    const positionId = condition.positionIds[i];
    let position = Position.load(positionId.toString());
    if (position == null) {
      position = new Position(positionId.toString());
      position.conditionId = condition.id;
      position.save();
    }
  }

  return condition;
};

export { loadCondition };
