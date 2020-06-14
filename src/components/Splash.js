import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: "35vh",
	},
}));
function Splash() {
	const classes = useStyles();
	return (
		<div>
			<Container
				maxWidth='xs'
				style={{ height: "100vh" }}
				onClick={() => window.location.replace("/landing")}>
				<div className={classes.paper}>
					<img src='/images/scvote.png' alt='logo' style={{ height: 100 }} />
					<Typography
						style={{ fontWeight: 600, fontSize: 30, color: "#2642E3" }}>
						SCVote
					</Typography>
				</div>
			</Container>
		</div>
	);
}

export default Splash;
