import React, { useState, forwardRef } from "react";
import {
	Grid,
	Paper,
	Slide,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { SharkbabyToken, StakingTokenPool } from "../contracts";
import {
	getBalance,
	getStakeBalance,
	getAllStakeBalance,
	getRewords,
	getSkakers,
	getAPY,
} from "../components/getData";
import WarningIcon from "@mui/icons-material/Warning";

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

const StakingCards = (props) => {
	const {
		setMystakebalance,
		setMybalance,
		mybalance,
		setAllStakeBalance,
		setRewordBalance,
		setStakeNum,
		setApy,
        referal
	} = props;

	const wallet = useWallet();
	const [amount, setAmount] = useState(0);
	const [open, setOpen] = useState(false);

	const handleChange = (e) => {
		setAmount(e.target.value);
	};

	const handleClickOpen = () => {
		if (wallet.status === "connected") setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleStaking = async () => {
		if (wallet.status === "connected") {
			try {
				var stakeAmont = ethers.utils.parseUnits(amount.toString(), 18);
				const provider = new ethers.providers.Web3Provider(
					wallet.ethereum
				);
				const signer = await provider.getSigner();
				var signedSharkbabyToken = SharkbabyToken.connect(signer);

				var tx = await signedSharkbabyToken.approve(
					StakingTokenPool.address,
					stakeAmont
				);
				await tx.wait();
				var signedStakingTokenPool = StakingTokenPool.connect(signer);
				tx = await signedStakingTokenPool.stake(stakeAmont,referal);
				await tx.wait();
                
                setOpen(false);

				setMybalance(await getBalance(wallet.account));
				setMystakebalance(await getStakeBalance(wallet.account));
				setAllStakeBalance(await getAllStakeBalance());
				setRewordBalance(await getRewords(wallet.account));
				setStakeNum(await getSkakers());
				setApy(await getAPY());
			} catch (err) {
				console.log(err);
                setOpen(false);
			}
		}
	};

	const handleall = async () => {
		wallet.status === "connected" ? setAmount(mybalance) : setAmount(0);
	};

	return (
		<div>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center">
				<Grid item>
					<div className="amountpanel">
						<h1 className="font-h2">Shake your SHARKBABY</h1>
						<br />
						<Item className="amountinput">
							<div className="input-group">
								<input
									type="number"
									min="0"
									className="form-control"
									placeholder="Enter Amount"
									onChange={handleChange}
									value={amount}
								/>
								<button
									className="input-group-text"
									onClick={handleall}>
									Max
								</button>
							</div>
							<p
								style={{
									float: "right",
								}}>
								<label>Balance:&nbsp;{mybalance}</label>
							</p>
						</Item>
						<button
							onClick={handleClickOpen}
							className="stackbutton stakeM">
							stack
						</button>
					</div>
				</Grid>
			</Grid>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				maxWidth="sm"
				fullWidth="fullWidth"
				onClose={handleClose}>
				<div className="checkpop">
					<DialogContent>
						<DialogTitle></DialogTitle>
						<DialogContentText id="alert-dialog-slide-description">
							<div className="pop_section1">
								<WarningIcon />
								You may be subject to a fee if you wish to
								unstake & withdraw your SHARKBABY tokens early
							</div>
							<div className="pop_section2">
								<label>Less than 6 weeks</label>
								<span>25.00%</span>
								<br />
								<label>6 weeks or more</label>
								<span>0.00%</span>
							</div>
							<div style={{ textAlign: "center" }}>
								<h5>
									Please click 'Next' if you wish to proceed.
								</h5>
							</div>
							<div>
								<Button
									size="large"
									color="success"
									variant="contained"
									className="stakingAceeptButton"
									onClick={handleStaking}>
									Accept
								</Button>
							</div>
						</DialogContentText>
					</DialogContent>
				</div>
			</Dialog>
		</div>
	);
};

export default StakingCards;
