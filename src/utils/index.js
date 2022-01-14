
import {ethers} from "ethers";

export const toBigNum = (amount,decimals) =>{
    return ethers.utils.parseUnits(String(amount),decimals);
} 

export const fromBigNum = (amount, decimals) =>{
    return Number(ethers.utils.formatUnits(amount,decimals));
}

export const styledNum = (amount) =>{
    return parseFloat(Number(amount).toFixed(3));
}