import { ethers } from "ethers";
import { SharkbabyToken, StakingTokenPool } from "../contracts";

export const getBalance = async (account) => {
	try {
		var tx = await SharkbabyToken.balanceOf(account);
		var balance = ethers.utils.formatUnits(tx);
		return Number(balance).toFixed(3);
	} catch (err) {
		console.log(err);
		return 0;
	}
};

export const getStakeBalance = async (account) => {
	try {
		
		var tx = await StakingTokenPool.getStakeInfo(account);
		var stakebalance = ethers.utils.formatUnits(tx._staking);
		return Number(stakebalance).toFixed(3);
	} catch (err) {
		console.log(err);
		return 0;
	}
};

export const getAllStakeBalance = async () => {
	try {
		// var tx = await SharkbabyToken.balanceOf(StakingTokenPoosl.address);
		var tx = await StakingTokenPool.totalStakingAmount();
		var allstakebalance = ethers.utils.formatUnits(tx);
		return Number(allstakebalance).toFixed(3);
	} catch (err) {
		console.log(err);
        return 0;
	}
};

export const getRewords = async (account) => {
	try {
		var rewords = [0,0];
		var tx = await StakingTokenPool.checkReward(account);
		
		var rewordbalance1 = ethers.utils.formatUnits(tx[0]);
		rewords[0] = Number(rewordbalance1).toFixed(3);
		var rewordbalance2 = ethers.utils.formatUnits(tx[1]);
		rewords[1] = Number(rewordbalance2).toFixed(3);

		return rewords;
	} catch (err) {
		console.log(err);
		return [0, 0];
	}
};

export const getSkakers = async () => {
	try {
		var stakeNum = await StakingTokenPool.stakerNum();
		return Number(stakeNum);
	} catch (err) {
		console.log(err);
        return 0;
	}
};

export const getAPY = async () => {
	try {
		var tx = await StakingTokenPool.APY();
		var APY = ethers.utils.formatUnits(tx ,4);
		return Number(APY);
	} catch (err) {
		console.log(err);
        return 0;
	}
};
