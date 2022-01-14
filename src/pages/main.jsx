import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import InfoCards from "../components/infoCards";
import StakingCards from "../components/stakingCards";
import StakeInfo from "../components/stakeinfo";
import {
	getBalance,
	getStakeBalance,
	getAllStakeBalance,
	getRewords,
	getSkakers,
	getAPY,
} from "../components/getData";

export const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	background: "transparent",
	boxShadow: "none",
}));

export default function Main(props) {
    const [referal,setReferal] = useState("0x0000000000000000000000000000000000000000")
	const wallet = useWallet();
	const [mystakebalance, setMystakebalance] = useState(0);
	const [mybalance, setMybalance] = useState(0);
	const [allstakebalance, setAllStakeBalance] = useState(0);
	const [rewordBalance, setRewordBalance] = useState([]);
	const [stakeNum, setStakeNum] = useState(0);
	const [apy, setApy] = useState(0);

	useEffect(() => {
		async function checkConnection() {
            
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(
					window.ethereum
				);
				const accounts = await provider.listAccounts();
				if (accounts.length !== 0) {
					wallet.connect();
				}
			}
			getAllStakeBalance().then((res)=>{
				setAllStakeBalance(res);
			});
			getSkakers().then((res)=>{
				setStakeNum(res);
			});
			getAPY().then((res)=>{
				setApy(res);
			});
		}
		checkConnection();
	}, []);

	useEffect(() => {
		async function getData() {
			if (wallet.status === "connected") {
				try {
					getBalance(wallet.account).then((res)=>{
						setMybalance(res);
					});

					getStakeBalance(wallet.account).then((res)=>{
						setMystakebalance(res);
					});

					getRewords(wallet.account).then((res)=>{
						setRewordBalance(res);
					});

				} catch (err) {
					console.log(err);
				}
			}
		}

		getData();
	}, [wallet.status]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        var referal = queryParams.get('r');
        if(ethers.utils.isAddress(referal)){
            setReferal(referal);
        }
    },[])
	return (
		<div style={{ paddingTop: "5%" }}>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center">
				<Grid item sm={12} xl={8}>
					<Item>
						<InfoCards
							allstakebalance={allstakebalance}
							stakeNum={stakeNum}
							apy={apy}
						/>
						<div style={{ height: "5vh" }}></div>
						<StakingCards
							setMystakebalance={setMystakebalance}
							mystakebalance={mystakebalance}
							setMybalance={setMybalance}
							mybalance={mybalance}
							setAllStakeBalance={setAllStakeBalance}
							setRewordBalance={setRewordBalance}
							setStakeNum={setStakeNum}
							setApy={setApy}
                            referal = {referal}
						/>
						<br />
						<br />
					</Item>
				</Grid>
				<Grid item sm={12} xl={4}>
					<Grid container justifyContent="center" alignItems="center">
						<Grid item></Grid>
						<Grid item>
							<StakeInfo
								setAllStakeBalance={setAllStakeBalance}
								setMybalance={setMybalance}
								setMystakebalance={setMystakebalance}
								mystakebalance={mystakebalance}
								setRewordBalance={setRewordBalance}
								rewordBalance={rewordBalance}
								setStakeNum={setStakeNum}
								setApy={setApy}
							/>
						</Grid>
						<Grid item></Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
