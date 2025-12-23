import { EventOnchain } from '../generated/schema';
import { ethereum } from '@graphprotocol/graph-ts';

function valueToString(value: ethereum.Value): string {
  if (value.kind == ethereum.ValueKind.STRING) {
    return value.toString();
  }
  if (value.kind == ethereum.ValueKind.ADDRESS) {
    return value.toAddress().toHexString();
  }
  if (
    value.kind == ethereum.ValueKind.INT ||
    value.kind == ethereum.ValueKind.UINT
  ) {
    return value.toBigInt().toString();
  }
  if (value.kind == ethereum.ValueKind.BYTES) {
    return value.toBytes().toHexString();
  }
  if (value.kind == ethereum.ValueKind.FIXED_BYTES) {
    return value.toBytes().toHexString();
  }
  if (value.kind == ethereum.ValueKind.BOOL) {
    return value.toBoolean() ? 'true' : 'false';
  }
  if (value.kind == ethereum.ValueKind.ARRAY) {
    let array = value.toArray();
    let result = '[';
    for (let i = 0; i < array.length; i++) {
      result += valueToString(array[i]);
      if (i < array.length - 1) {
        result += ',';
      }
    }
    result += ']';
    return result;
  }
  if (value.kind == ethereum.ValueKind.TUPLE) {
    return 'Tuple(...)';
  }
  return 'Unknown';
}

export function createEventOnchain(
  event: ethereum.Event,
  eventName: string,
): void {
  let eventOnchain = new EventOnchain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  eventOnchain.blockNumber = event.block.number;
  eventOnchain.transactionHash = event.transaction.hash;
  eventOnchain.contractAddress = event.address;
  eventOnchain.eventName = eventName;
  eventOnchain.createdAt = event.block.timestamp;

  let args = '{';
  for (let i = 0; i < event.parameters.length; i++) {
    let param = event.parameters[i];
    args += '"' + param.name + '":"' + valueToString(param.value) + '"';
    if (i < event.parameters.length - 1) {
      args += ',';
    }
  }
  args += '}';
  eventOnchain.args = args;

  eventOnchain.save();
}
