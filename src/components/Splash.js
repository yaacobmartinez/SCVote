import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
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
			<Container maxWidth='xs' style={{ height: "100vh" }}>
				<div className={classes.paper}>
					<Link to='/login' style={{ textDecoration: "none" }}>
						<img src='/images/scvote.png' alt='logo' style={{ height: 100 }} />
						<Typography
							style={{
								fontWeight: 600,
								fontSize: 30,
								color: "#2642E3",
							}}>
							SCVote
						</Typography>
					</Link>
				</div>
			</Container>
		</div>
	);
}

export default Splash;
