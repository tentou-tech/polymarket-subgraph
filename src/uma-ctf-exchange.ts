import {
  QuestionInitialized as QuestionInitializedEvent,
  QuestionResolved as QuestionResolvedEvent,
} from '../generated/UmaCtfAdapter/UmaCtfAdapter';
import { log } from '@graphprotocol/graph-ts';
import { createEventOnchain } from './utils';
import { QuestionInitialized, QuestionResolved } from '../generated/schema';

export function handleQuestionInitialized(
  event: QuestionInitializedEvent
): void {
  log.info('Handling QuestionInitialized event', []);
  let entity = new QuestionInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.questionID = event.params.questionID;
  entity.requestTimestamp = event.params.requestTimestamp;
  entity.creator = event.params.creator;
  entity.ancillaryData = event.params.ancillaryData;
  entity.rewardToken = event.params.rewardToken;
  entity.reward = event.params.reward;
  entity.proposalBond = event.params.proposalBond;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleQuestionResolved(event: QuestionResolvedEvent): void {
  log.info('Handling QuestionResolved event', []);
  let entity = new QuestionResolved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.questionID = event.params.questionID;
  entity.settledPrice = event.params.settledPrice;
  entity.payouts = event.params.payouts;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
