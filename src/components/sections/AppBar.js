import React, { useState, useContext } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	makeStyles,
	Typography,
	Menu,
	MenuItem,
	ListItemIcon,
} from "@material-ui/core";
import { MoreVert, Person, ExitToApp, ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { BallotContext } from "../contexts/BallotContext";

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: "#2878f4",
	},
	color: {
		color: "#fff",
	},
}));
function CustomAppBar({ page }) {
	const classes = useStyles();
	const history = useHistory();
	const [, , logOut] = useContext(BallotContext);
	const handleLogout = () => {
		logOut();
		window.location.replace("/login");
	};
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<AppBar className={classes.appBar} elevation={1} position='fixed'>
				<Toolbar>
					{page ? (
						<IconButton onClick={() => history.goBack()}>
							<ArrowBack className={classes.color} />
						</IconButton>
					) : null}
					<Typography style={{ flex: 1, marginLeft: 20 }} variant='button'>
						{page ? page : process.env.REACT_APP_DEFAULT_ELECTION}
					</Typography>
					<IconButton onClick={handleClick}>
						<MoreVert className={classes.color} />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={handleClose}>
							<ListItemIcon style={{ minWidth: 30 }}>
								<Person fontSize='small' />
							</ListItemIcon>
							<Typography variant='inherit'>My Account</Typography>
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<ListItemIcon style={{ minWidth: 30 }}>
								<ExitToApp fontSize='small' />
							</ListItemIcon>
							<Typography variant='inherit'>Logout</Typography>
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default CustomAppBar;
