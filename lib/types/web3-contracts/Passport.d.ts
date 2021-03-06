/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractOptions, Options } from "web3-eth-contract";
import { Block } from "web3-eth";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { Callback, TransactionObject } from "./types";

export class Passport extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  methods: {
    claimOwnership(): TransactionObject<void>;

    renounceOwnership(): TransactionObject<void>;

    destroy(): TransactionObject<void>;

    transferOwnership(newOwner: string): TransactionObject<void>;

    destroyAndSend(_recipient: string): TransactionObject<void>;

    getPassportLogicRegistry(): TransactionObject<string>;
    owner(): TransactionObject<string>;
    pendingOwner(): TransactionObject<string>;
  };
  events: {
    PassportLogicRegistryChanged(
      options?: {
        filter?: object;
        fromBlock?: number | string;
        topics?: (null | string)[];
      },
      cb?: Callback<EventLog>
    ): EventEmitter;

    OwnershipRenounced(
      options?: {
        filter?: object;
        fromBlock?: number | string;
        topics?: (null | string)[];
      },
      cb?: Callback<EventLog>
    ): EventEmitter;

    OwnershipTransferred(
      options?: {
        filter?: object;
        fromBlock?: number | string;
        topics?: (null | string)[];
      },
      cb?: Callback<EventLog>
    ): EventEmitter;

    allEvents: (
      options?: {
        filter?: object;
        fromBlock?: number | string;
        topics?: (null | string)[];
      },
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
