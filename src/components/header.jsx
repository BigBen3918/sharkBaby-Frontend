import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import logo from "../components/assets/img/logo.png";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import imgMetamask from "../components/assets/metamask.svg";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	background: "transparent",
	boxShadow: "none",
}));

export default function Header() {
	const [mobileView, setMobileView] = useState(false);
	const [drowdownFlag, setDrowdownFlag] = useState(false);

	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 1000
				? setMobileView(true)
				: setMobileView(false);
		};

		setResponsiveness();
		window.addEventListener("resize", () => setResponsiveness());
	});

	function mobileMenuButton() {
		drowdownFlag ? setDrowdownFlag(false) : setDrowdownFlag(true);
	}

	/* ------------ connect wallet --------------*/

	const wallet = useWallet();
	var styledAddress = wallet.account
		? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
		: "";

	//check connection
	const handleChainChanged = (chainId) => {
		let { ethereum } = window;
		if (ethereum.isConnected() && Number(chainId) === 4002) {
			onConnect();
		}
	};

	React.useEffect(() => {
		checkConnection();
	}, []);

	const checkConnection = async () => {
		let { ethereum } = window;
		if (ethereum !== undefined) {
			const chainId = await ethereum.request({ method: "eth_chainId" });
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const accounts = await provider.listAccounts();
			if (accounts.length !== 0 && Number(chainId) === 4002) {
				onConnect();
			}
			ethereum.on("chainChanged", handleChainChanged);
		}
	};

	const onConnect = () => {
		if (wallet.status !== "connected") {
			wallet.connect().catch((err) => {
				alert("please check metamask!");
			});
		}
	};

	const disconnect = () => {
		if (wallet.status === "connected") {
			wallet.reset();
		}
	};

	return (
		<div>
			<br />
			{!mobileView ? (
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					columns={14}
					spacing={5}>
					<Grid item xl={3} lg={3} md={3} sm={12} className="logo">
						<Item>
							<img
								src={logo}
								className="logo-img noselect"
								alt="NoImg"
							/>
							<span
								style={{
									color: "white",
									fontSize: "180%",
									fontWeight: "bold",
								}}
								className="noselect">
								Shark<b style={{ color: "#ffa94d" }}>baby</b>
							</span>
						</Item>
					</Grid>
					<Grid item xl={1} lg={2} md={2} sm={12} xs={12}></Grid>
					<Grid item xl={1} lg={2} md={2} sm={12} xs={12}></Grid>
					<Grid item xl={1} lg={2} md={2} sm={12} xs={12}></Grid>
					<Grid item xl={1} lg={2} md={2} sm={12} xs={12}></Grid>
					<Grid item md={3} sm={6} xs={12}>
						<Item>
							{wallet.status === "connected" ? (
								<button
									className="connectbutton noselect"
									style={{ textTransform: "none" }}
									onClick={disconnect}>
									<img
										src={imgMetamask}
										alt="wallet"
										style={{
											width: "1.5em",
											height: "1.5em",
											marginRight: 10,
										}}
									/>
									Disconnect
								</button>
							) : (
								<button
									onClick={() => onConnect()}
									className="connectbutton noselect"
									style={{ textTransform: "none" }}>
									{wallet.status === "connecting" ? (
										<div>
											<span
												className="spinner-border"
												role="status"
												style={{
													width: "1.5em",
													height: "1.5em",
													marginRight: 10,
												}}></span>
											<span className="sr-only ">
												Loading...
											</span>
										</div>
									) : (
										<div>
											<img
												src={imgMetamask}
												alt="wallet"
												style={{
													width: "1.5em",
													height: "1.5em",
													marginRight: 10,
												}}
											/>
											Connect
										</div>
									)}
								</button>
							)}
						</Item>
					</Grid>
				</Grid>
			) : (
				<Grid
					contanier
					direction="row"
					justifyContent="center"
					alignItems="center">
					<Grid item sm={12} xs={12}>
						<Grid
							container
							justifyContent="center"
							alignItems="center">
							<Grid item sm={2} xs={2}>
								<img
									src={logo}
									className="mobile-logo-img noselect"
									alt="NoImg"
								/>
							</Grid>
							<Grid item sm={8} xs={8}></Grid>
							<Grid
								item
								sm={2}
								xs={2}
								onClick={mobileMenuButton}
								style={{ zIndex: "2000" }}>
								<div className="mobile-container">
									<div className="mobile-bar1"></div>
									<div className="mobile-bar2"></div>
									<div className="mobile-bar3"></div>
								</div>
							</Grid>
						</Grid>
						{drowdownFlag ? (
							<Grid
								container
								justifyContent="center"
								alignItems="center">
								<Grid item xs={12} sm={6}></Grid>
								<Grid item xs={12} sm={6}></Grid>
								<Grid item xs={12} sm={6}></Grid>
								<Grid item xs={12} sm={6}></Grid>
								<Grid
									item
									xs={12}
									sm={12}
									style={{ zIndex: "1" }}>
									<Item>
										{wallet.status === "connected" ? (
											<button
												className="mobile-connectbutton noselect"
												style={{
													textTransform: "none",
												}}
												onClick={disconnect}>
												<img
													src={imgMetamask}
													alt="wallet"
													style={{
														width: "1.5em",
														height: "1.5em",
														marginRight: 10,
													}}
												/>
												Disconnect
											</button>
										) : (
											<button
												onClick={() => onConnect()}
												className="mobile-connectbutton noselect"
												style={{
													textTransform: "none",
												}}>
												{wallet.status ===
												"connecting" ? (
													<div>
														<span
															className="spinner-border"
															role="status"
															style={{
																width: "1.5em",
																height: "1.5em",
																marginRight: 10,
															}}></span>
														<span className="sr-only ">
															Loading...
														</span>
													</div>
												) : (
													<div>
														<img
															src={imgMetamask}
															alt="wallet"
															style={{
																width: "1.5em",
																height: "1.5em",
																marginRight: 10,
															}}
														/>
														Connect
													</div>
												)}
											</button>
										)}
									</Item>
								</Grid>
							</Grid>
						) : (
							""
						)}
					</Grid>
				</Grid>
			)}
		</div>
	);
}
