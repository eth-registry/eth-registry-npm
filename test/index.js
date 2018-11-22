import { assert, expect, should } from "chai";
import Web3 from "web3";
import Registry from "../src";

const registry = new Registry();

describe("Metadata", () => {
    describe("Price", () => {
        it("should be retrieved from the contract", async () => {
            const price = await registry.price();
            console.log(`price is ${price}`);
            assert(price >= 0, "Couldn't retrieve price");
        });
    });

    describe("Address", () => {
        it("should be correct", () => {
            assert(
                registry.isValidAddress(
                    "0xfa91455977911e46f48b0c362174f52176ed49b6",
                ),
                "Not valid address :(",
            );
        });
    });

    describe("Spankchain", () => {
        it("should have data on Eth Registry", async () => {
            const spank = await registry.get(
                "0x42d6622dece394b54999fbd73d108123806f6a18",
            );
            assert(spank !== null, "Got spanked :(");
        });
    });

    describe("0xa3D22569364Fe6D27E8545bdc2aC62D68004F1Db", () => {
        it("should be a curator", async () => {
            const spank = await registry.isCurator(
                "0xa3D22569364Fe6D27E8545bdc2aC62D68004F1Db",
            );
            assert(spank !== null, "ain't so");
        });
    });

    describe("getEmptyObject()", () => {
        it("should return an object", async () => {
            const spank = await registry.getEmptyObject();
            assert(spank !== null, "ain't so");
        });
    });
});
