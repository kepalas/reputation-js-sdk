import { IEthOptions } from '../models/IEthOptions';
import Web3 from 'web3';
import { Address } from '../models/Address';
import { IIPFSClient } from '../models/IIPFSClient';
import { IPrivateDataHashes } from './FactReader';
/**
 * Class to write facts to passport
 */
export declare class FactWriter {
    private contract;
    private options;
    private web3;
    readonly passportAddress: string;
    constructor(web3: Web3, passportAddress: Address, options?: IEthOptions);
    /**
     * Writes string type fact to passport
     */
    setString(key: string, value: string, factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes bytes type fact to passport
     */
    setBytes(key: string, value: number[], factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes address type fact to passport
     */
    setAddress(key: string, value: Address, factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes uint type fact to passport
     */
    setUint(key: string, value: number, factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes int type fact to passport
     */
    setInt(key: string, value: number, factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes boolean type fact to passport
     */
    setBool(key: string, value: boolean, factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes TX data type fact to passport
     */
    setTxdata(key: string, value: number[], factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes IPFS hash data type fact to passport
     *
     * @param value value to store on IPFS
     * @param ipfs IPFS client
     */
    setIPFSData(key: string, value: any, factProviderAddress: Address, ipfs: IIPFSClient): Promise<import("web3-core").TransactionConfig>;
    /**
     * Writes private data value to IPFS by encrypting it and then storing IPFS hashes of encrypted data to passport fact.
     * Data can be decrypted using passport owner's wallet private key or a secret key which is returned as a result of this call.
     *
     * @param value value to store privately
     * @param ipfs IPFS client
     */
    setPrivateData(key: string, value: number[], factProviderAddress: Address, ipfs: IIPFSClient): Promise<{
        dataIpfsHash: any;
        dataKey: number[];
        dataKeyHash: number[];
        tx: import("web3-core").TransactionConfig;
    }>;
    /**
     * Writes IPFS hash of encrypted private data and hash of data encryption key
     */
    setPrivateDataHashes(key: string, value: IPrivateDataHashes, factProviderAddress: Address): Promise<import("web3-core").TransactionConfig>;
    private set;
}
