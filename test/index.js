import { assert } from "chai";
import Web3 from "web3";
import Registry from "../src";

const network = "mainnet";
const provider = new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API}`,
);
const registry = new Registry(provider);

describe("Metadata", () => {
    // describe("Price", () => {
    //     it("should be retrieved from the contract", async () => {
    //         const price = await registry.getPrice();
    //         assert(price.length > 0);
    //     });
    // });

    describe("Address", () => {
        it("Should be correct", () => {
            assert(
                registry.isValidAddress(
                    "0xfa91455977911e46f48b0c362174f52176ed49b6",
                ),
                "Not valid address :(",
            );
        });
    });
    // it("should test awesome function", () => {
    //     const expectedVal = "I am just an Awesome Function";
    //     assert(awesomeFunction() === expectedVal, "Named awesome :(");
    // });
});
