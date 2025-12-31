/* eslint-disable @typescript-eslint/ban-types */

import { Address, BigInt } from '@graphprotocol/graph-ts';
import { UserPositionPnlBucket } from '../types/schema';

export function updatePnlBuckets(
  user: Address,
  tokenId: BigInt,
  conditionId: string,
  deltaPnL: BigInt,
  amount: BigInt,
  timestamp: BigInt,
): void {
  const periods = ['day', 'week', 'month'];
  const durations = [
    BigInt.fromI32(86400), // 1 day
    BigInt.fromI32(604800), // 1 week
    BigInt.fromI32(2592000), // 30 days (approx month)
  ];

  for (let i = 0; i < periods.length; i++) {
    const period = periods[i];
    const duration = durations[i];
    const periodStart = timestamp.div(duration).times(duration);

    const id =
      user.toHexString() +
      '-' +
      tokenId.toString() +
      '-' +
      period +
      '-' +
      periodStart.toString();

    let bucket = UserPositionPnlBucket.load(id);
    if (bucket == null) {
      bucket = new UserPositionPnlBucket(id);
      bucket.user = user.toHexString();
      bucket.tokenId = tokenId;
      bucket.conditionId = conditionId;
      bucket.period = period;
      bucket.pnl = BigInt.zero();
      bucket.amount = BigInt.zero();
      bucket.timestamp = periodStart;
    }

    bucket.pnl = bucket.pnl.plus(deltaPnL);
    bucket.amount = amount;
    bucket.save();
  }
}
