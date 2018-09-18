import Eth from "ethjs";
import abi from "../abi/metadata.json";
import IPFS from "ipfs-mini";

const contractAddress = "0xfa91455977911e46f48b0c362174f52176ed49b6";
const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

export default class Metadata {

    /** @description Initialize The Registry module
    * @param {provider} Web3 provider
    */
    constructor(provider) {
        this.provider = provider;
        this.contract = eth.contract(abi).at(contractAddress);
    }

    async isCurator() {}

    async getPrice() {}


    /** @description Initialize The Registry module
    * @param {string} _address
    * @return {metadata} Metadata object with received metadata or null when no metadata available
    */
    async getMetadata(_address) {

        // Query contract for available metadata
        let query = await this.contract.getByAddress(_address).catch(e => {console.error(e)});
        if (!query || query[0] === "0x0000000000000000000000000000000000000000" || !query[2])
            return null;

        // Query IPFS to get JSON
        let ipfs = await this.lookUp(query[2]).catch(e => {console.error(e)});
        if (!ipfs) return null;

        // @todo check if metadata is valid
        let metadata = JSON.parse(JSON.stringify(ipfs));

        // @todo merge metadata object with empty object to bring it up to date if spec changed

        return {
            address: query[0],
            name: query[1],
            data: JSON.parse(JSON.stringify(ipfs));
            self_attested: query[3],
            curated: query[4],
            submitter: result[5]
        }
    }

    /** @description Stores address metadata on The Registry
    * @param {string} Address for which you are submitting data
    * @param {string} Name of the address
    * @param {string} Metadata object
    * @param {function} Callback for when the transaction receipt is returned
    * @return {string} TX Hash of the submitted file
    */
    async storeMetadata(_address, _name, _data, _onReceipt) {
        let ipfsHash = await storeJsonIPFS(_data);
        if (!ipfsHash)
    }

    getEmptyObject() {
        const newObj = JSON.pase(JSON.stringify(json));
        return newObj;
    }

    async storeJsonIPFS(data) {

    }

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
}
