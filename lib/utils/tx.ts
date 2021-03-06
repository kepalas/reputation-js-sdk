import * as abiDecoder from 'abi-decoder';
import BN from 'bn.js';
import EthTx from 'ethereumjs-tx';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import { RLPEncodedTransaction, Transaction, TransactionConfig } from 'web3-core';
import passportLogicAbi from '../../config/PassportLogic.json';
import { IEthOptions } from 'lib/models/IEthOptions';
import { Address } from 'lib/models/Address';
import { TransactionObject } from 'lib/types/web3-contracts/types';

export interface IMethodInfo {
  name: string;
  params: IMethodParam[];
}

export interface IMethodParam {
  name: string;
  type: string;
  value: string;
}

export interface ITxData {
  tx: Transaction;
  methodInfo: IMethodInfo;
}

/**
 * Gets transaction by hash. Retrieved TX data will be the one which was signed with private key.
 */
export const getSignedTx = async (txHash: string, web3: Web3, options?: IEthOptions) => {
  if (options && options.signedTxRetriever) {
    return options.signedTxRetriever(txHash, web3);
  }

  return web3.eth.getTransaction(txHash);
};

/**
 * Transforms given transaction (using options.txDecoder if specified) and decodes tx input method. *
 */
export const decodeTx = async(tx: Transaction, web3: Web3, options?: IEthOptions) => {
  abiDecoder.addABI(passportLogicAbi);

  let decodedTx = tx;

  if (options && options.txDecoder) {
    decodedTx = await options.txDecoder(tx, web3);
  }

  const result = {
    tx: decodedTx,
    methodInfo: abiDecoder.decodeMethod(decodedTx.input),
  };

  return result;
};

/**
 * Gets sender's elliptic curve public key (prefixed with byte 4)
 */
export const getSenderPublicKey = (tx: RLPEncodedTransaction['tx']) => {

  const ethTx = new EthTx({
    nonce: tx.nonce,
    gasPrice: ethUtil.bufferToHex(new BN(tx.gasPrice).toBuffer()),
    gasLimit: tx.gas,
    to: tx.to,
    value: ethUtil.bufferToHex(new BN(tx.value).toBuffer()),
    data: tx.input,
    r: (tx as any).r,
    s: (tx as any).s,
    v: (tx as any).v,
  });

  // To be a valid EC public key - it must be prefixed with byte 4
  return Buffer.concat([Buffer.from([4]), ethTx.getSenderPublicKey()]);
};

/**
 * Prepares transaction configuration for execution.
 * This includes nonce, gas price and gas limit estimation
 */
export const prepareTxConfig = async <TData>(
  web3: Web3,
  from: Address,
  to: Address,
  data: TransactionObject<TData>,
  value: number | BN = 0,
  gasLimit?: number,
): Promise<TransactionConfig> => {
  const nonce = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();
  const actualGasLimit = (gasLimit > 0 || gasLimit === 0) ?
    gasLimit :
    await web3.eth.estimateGas({
      data: data.encodeABI(),
      from,
      to,
      value,
    });

  return {
    from,
    to,
    nonce,
    gasPrice,
    gas: actualGasLimit,
    value,
    data: data.encodeABI(),
  };
};
