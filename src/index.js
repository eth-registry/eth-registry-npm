import "babel-polyfill";
import Eth from "ethjs";
import IPFS from "ipfs-mini";
import spec from "./spec.js";
import abi from "../abi/metadata.json";

const contractAddress = "0x201be2022c9b58428d6a5743f2bd4cb8934547df";

const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

export default class Metadata {
    /**
     * Initialize The Registry module
     * @constructor
     * @param {HttpProvider} provider - Web3 provider
     */
    constructor(provider) {
        this.provider = provider;
        this.eth = new Eth(provider);
        this.contract = this.eth.contract(abi).at(contractAddress);
    }

    async isCurator(_address) {
        return this.contract
            .isCurator(_address)
            .then(r => {
                return r[0];
            })
            .catch(e => {
                console.error;
            });
    }

    /** @description Retrieve metadata for this address
     * @param {string} _address
     * @returns {string} Address Metadata object with received metadata or null when no metadata available
     * @returns {string} Name Metadata object with received metadata or null when no metadata available
     * @example
     * ```js
     * import Registry from "theregistry";
     * import Eth from "ethjs";
     *
     * const provider = new Eth.HttpProvider(
     *   `https://mainnet.infura.io/`,
     * );
     *
     * const registry = new Registry(provider);
     * registry
     *   .get(ensaddress)
     *   .then(r => {
     *       console.log(r.data);
     *   })
     *   .catch(e => console.error(e));
     *
     * ```
     */
    async get(_address) {
        // Query contract for available metadata
        let query = await this.contract.getByAddress(_address).catch(e => {
            console.error(e);
        });
        if (!query || query[0] === "0x" || !query[2]) return null;

        // Query IPFS to get JSON
        let ipfs = await this.lookUp(query[2]).catch(e => {
            console.error(e);
        });
        if (!ipfs) return null;

        // @todo check if metadata is valid
        let metadata = JSON.parse(JSON.stringify(ipfs));

        // @todo merge metadata object with empty object to bring it up to date if spec changed

        return {
            address: query[0],
            name: query[1],
            data: JSON.parse(JSON.stringify(ipfs)),
            self_attested: query[3],
            curated: query[4],
            submitter: query[5],
        };
    }

    /** @description Stores address metadata on The Registry
     * @param {string} _address - Address for which you are submitting data
     * @param {string} _name - Name of the address
     * @param {string} _data - Metadata object
     * @param {function} _callback - Callback for when the transaction receipt is returned
     * @return {string} TX Hash of the submitted file
     */
    async storeMetadata(_address, _name, _data, _onReceipt) {
        let ipfsHash = await storeJsonIPFS(_data);
        if (!ipfsHash) return;
    }

    getEmptyObject() {
        const newObj = JSON.pase(JSON.stringify(spec));
        return newObj;
    }

    isValidAddress(address) {
        if (address && address.length === 42) return Eth.isAddress(address);
        return false;
    }

    async storeJsonIPFS(data) {}

    /** @description Reads content of a JSON file and stores it on IPFS
     * @param {blob} Blob accepted by Filereader
     * @return {string} IPFS Hash of stored file
     */
    async storeJsonFileIPFS(data) {
        return new Promise((resolve, reject) => {
            reader = new FileReader();
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            reader.onload = () => {
                let json = JSON.parse(reader.result);
                ipfs.addJSON(json, (err, result) => {
                    if (err) reject(err);
                    console.log(result);
                    resolve(result);
                });
            };
            reader.readAsText(data);
        });
    }

    /** @description Reads content of a Plaintext file and stores it on IPFS
     * @param {blob} Blob accepted by Filereader
     * @return {string} IPFS Hash of stored file
     */
    async storeDataFileIPFS(data) {
        return new Promise((resolve, reject) => {
            reader = new FileReader();
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            reader.onload = () => {
                ipfs.add(reader.result, (err, result) => {
                    if (err) reject(err);
                    console.log(result);
                    resolve(result);
                });
            };
            reader.readAsText(data);
        });
    }

    /** @description Converts an image blob to a base64 string
     * @param {blob} Blob accepted by Filereader
     * @return {string} base64 encoded image file
     */
    async convertBlobToBase64(blob) {
        console.log(blob);
        return new Promise((resolve, reject) => {
            reader = new FileReader();
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            reader.onload = () => {
                resolve(reader.result);
            };
            console.log(blob);
            reader.readAsDataURL(blob[0]);
        });
    }

    /** @description Reads content of a JSON file and stores it on IPFS
     * @param {string} IPFS address to look up
     * @return {string} JSON contents returned from IPFS
     */
    async lookUp(address) {
        if (address);
        return new Promise((resolve, reject) => {
            ipfs.catJSON(address, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * Retrieve the current price for submitting data to The Registry
     * @param {string} unit - Unit to convert the price to (defaults to 'ether')
     * @returns {number} Current price
     */
    async price(unit = "ether") {
        return this.contract
            .getPrice()
            .then(r => {
                return Eth.fromWei(r[0], unit);
            })
            .catch(e => {
                console.error(e);
            });
    }
}
