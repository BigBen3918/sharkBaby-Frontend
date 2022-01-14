import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { StakingTokenPool } from "../contracts";
import React, { useState, forwardRef } from "react";
import {
	getBalance,
	getStakeBalance,
	getAllStakeBalance,
	getRewords,
	getSkakers,
	getAPY
} from "../components/getData";

import {CopyToClipboard} from 'react-copy-to-clipboard';

import {
	Grid,
	Slide,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

import symbol from "./assets/img/symbol4.png";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	background: "transparent",
	boxShadow: "none",
	color: "white",
	fontSize: "110%",
	fontFamily: "System",
}));

const StakeInfo = (props) => {
	const {
		setAllStakeBalance,
		setMybalance,
		setMystakebalance,
		mystakebalance,
		rewordBalance,
		setRewordBalance,
		setStakeNum,
		setApy,
	} = props;

	const wallet = useWallet();
	const [open, setOpen] = useState(false);
    const [referalLink, setReferalLink] = useState("");

    React.useEffect(() => {
        if(wallet.status === "connected") {
            setReferalLink(process.env.REACT_APP_DOMAIN + "?r=" + wallet.account);
        }
        else {
            setReferalLink("Please Connect Metamask");
        }
    },[wallet.status])
	const handleWithdrawing = async () => {
		if (wallet.status === "connected") {
			try {
				const provider = new ethers.providers.Web3Provider(
					wallet.ethereum
				);
				const signer = await provider.getSigner();

				var signedStakingTokenPool = StakingTokenPool.connect(signer);
				var tx = await signedStakingTokenPool.unstaking();
				await tx.wait();

				setMybalance(await getBalance(wallet.account));
				setMystakebalance(await getStakeBalance(wallet.account));
				setAllStakeBalance(await getAllStakeBalance());
				setRewordBalance(await getRewords(wallet.account));
				setStakeNum(await getSkakers());
				setApy(await getAPY());
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleClaimReward = async () => {
		if (wallet.status === "connected") {
			try {
				const provider = new ethers.providers.Web3Provider(
					wallet.ethereum
				);
				const signer = await provider.getSigner();

				var signedStakingTokenPool = StakingTokenPool.connect(signer);
				var tx = await signedStakingTokenPool.claimRewards();
				await tx.wait();
			} catch (err) {
				console.log(err);
			}
		}
	};

    const handleClose = () => {
		setOpen(false);
	};

    const handleReferal = async () => {
        setOpen(true);
    }

    const styledText = (text) => {
        if(isMobile) return text.slice(0,15) + "..." + text.slice(-4)
        return text.slice(0,28) + "..." + text.slice(-5)
    }

    const isMobile = ()=>{
        return window.innerWidth <= 760;
    }

    const ReferalCard = () => {
        return (
            <Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				maxWidth="sm"
				fullWidth="fullWidth"
				onClose={handleClose}>
				<div className="checkpop">
					<DialogContent>
						<DialogTitle className="text-h2">Referral Program</DialogTitle>
						<DialogContentText id="alert-dialog-slide-description">
							<div className="pop_section1_1">
                                Share the referral link, Earn with your friend{"'"}s earnings. 
							</div>
							<div >
                                <Button
									size="large"
									color="success"
									variant="contained"
									className="stakingAceeptButton"
									>
							    <CopyToClipboard text={referalLink}
                                    onCopy = {()=>{handleClose()}}
                                >
                                <h5>
                                    {styledText(referalLink)}
								</h5>
                                </CopyToClipboard>
								</Button>
							</div>
						</DialogContentText>
					</DialogContent>
				</div>
			</Dialog>
        )
    }

	return (
		<div className="stakedpanel noselect">
            <ReferalCard />
			<img src={symbol} alt="NoImg" className="stakepanelmark" />
			<Item>
				<br />
				<p>Stacked</p>
				<label className="stakedtitle">
					{wallet.status === "connected" ? mystakebalance : "0.00000"}
				</label>
				<p>Reward (AutoShark)</p>
				<label className="stakedtitle">
					{wallet.status === "connected"
						? rewordBalance[0]
						: "0.0000"}
				</label>
				<br />
				<p>Reward (Babyswap)</p>
				<label className="stakedtitle">
					{wallet.status === "connected"
						? rewordBalance[1]
						: "0.0000"}
				</label>
				<br />
				<br />
				<button
					className="stackedbutton add"
					onClick={handleClaimReward}>
					ClaimReward
				</button>
				<br />
				<br />
				<button
					className="stackedbutton withdraw"
					onClick={handleWithdrawing}>
					Withdraw
				</button>
				<br />
				<br />
				<button
					className="stackedbutton withdraw"
					onClick={handleReferal}>
					Referal
				</button>
			</Item>
		</div>
	);
};

export default StakeInfo;
