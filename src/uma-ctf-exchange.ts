import {
  QuestionInitialized as QuestionInitializedEvent,
  QuestionResolved as QuestionResolvedEvent
} from '../generated/UmaCtfAdapter/UmaCtfAdapter';
import { log } from '@graphprotocol/graph-ts';
import { createEventOnchain } from './utils';

export function handleQuestionInitialized(event: QuestionInitializedEvent): void {
  log.info('Handling QuestionInitialized event', []);
  createEventOnchain(event, 'QuestionInitialized');
}

export function handleQuestionResolved(event: QuestionResolvedEvent): void {
  log.info('Handling QuestionResolved event', []);
  createEventOnchain(event, 'QuestionResolved');
}