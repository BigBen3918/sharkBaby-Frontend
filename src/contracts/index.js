import { ethers } from "ethers";
import contracts from "./56.json";

const rpc = "https://bsc-dataseed4.binance.org/";
// const chainid = process.env.REACT_APP_CHAIN_ID;

const provider = new ethers.providers.JsonRpcProvider(rpc);

const SharkbabyToken = new ethers.Contract(
	contracts.sharkbabyToken.address,
	contracts.sharkbabyToken.abi,
	provider
);

const StakingTokenPool = new ethers.Contract(
	contracts.stakingTokenPool.address,
	contracts.stakingTokenPool.abi,
	provider
);

export { provider, SharkbabyToken, StakingTokenPool };
