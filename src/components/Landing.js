import React, { useState } from "react";
import {
	Typography,
	Button,
	Container,
	makeStyles,
	Slide,
	MobileStepper,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundSize: "cover",
		height: "100vh",
		display: "flex",
	},

	container: {
		textAlign: "center",
		paddingTop: theme.spacing(10),
	},
	title: {
		textAlign: "center",
		padding: theme.spacing(2),
		marginTop: -30,
	},
	btn: {
		textTransform: "none",
		position: "relative",
		borderRadius: 20,
		margin: theme.spacing(2, 0),
	},
	secondarybtn: {
		textTransform: "none",
		borderRadius: 20,
	},
	mainTitle: {
		fontWeight: 600,
		color: "#000",
	},
	logo: {
		fontSize: 60,
		color: theme.palette.primary.contrastText,
	},

	view: { minHeight: "100vh", minWidth: "100vw" },
	stepper: {
		position: "fixed",
		bottom: theme.spacing(10),
		left: "39vw",
		background: "#fff",
		"& .MuiMobileStepper-dot": {
			height: "12px",
			width: "12px",
			margin: theme.spacing(0, 0.5),
		},
	},
	panel: {
		padding: theme.spacing(15, 2, 2, 2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));
function Landing() {
	const classes = useStyles();
	const [idx, setidx] = useState(0);
	const handleChange = (idx) => {
		setidx(idx);
	};
	return (
		<Slide in={true} direction='left'>
			<div>
				<SwipeableViews
					enableMouseEvents
					index={idx}
					onChangeIndex={handleChange}>
					<div className={classes.view}>
						<div className={classes.panel}>
							<img alt='1' src='/images/1.jpg' style={{ height: 300 }} />
							<Typography color='textSecondary'>
								View candidates for different parties, view their profiles and
								election platform.
							</Typography>
						</div>
					</div>
					<div className={classes.view}>
						<div className={classes.panel}>
							<img alt='2' src='/images/2.jpg' style={{ height: 300 }} />
							<Typography color='textSecondary'>
								Vote for your favorite candidate.
							</Typography>
						</div>
					</div>
					<div className={classes.view}>
						<div className={classes.panel}>
							<img alt='3' src='/images/3.jpg' style={{ height: 300 }} />
							<Typography color='textSecondary'>Review your votes.</Typography>
						</div>
					</div>
					<div className={classes.view}>
						<GetStarted />
					</div>
				</SwipeableViews>
				<MobileStepper
					variant='dots'
					steps={4}
					position='bottom'
					activeStep={idx}
					className={classes.stepper}
				/>
			</div>
		</Slide>
	);
}

const GetStarted = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Container fixed maxWidth='md' className={classes.container}>
				<img src='/images/scvote.png' alt='logo' style={{ height: 100 }} />
				<div className={classes.title}>
					<Typography variant='h4' className={classes.mainTitle}>
						Student Council Elections
					</Typography>
					<Typography variant='h3' className={classes.mainTitle} gutterBottom>
						2019
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						Welcome! Let's execute your power to elect officials!
					</Typography>
				</div>
				<Button
					href='/register'
					className={classes.btn}
					size='large'
					fullWidth
					color='primary'
					variant='contained'>
					Get Started
				</Button>
				<Button
					href='/login'
					color='primary'
					variant='outlined'
					className={classes.secondarybtn}
					size='large'
					fullWidth>
					I have an account, Sign me in
				</Button>
			</Container>
		</div>
	);
};
export default Landing;
