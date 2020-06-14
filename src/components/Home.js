import React, { useContext, useState } from "react";
import {
	Typography,
	Slide,
	makeStyles,
	Grid,
	Avatar,
	BottomNavigation,
	BottomNavigationAction,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Chip,
} from "@material-ui/core";
import CustomAppBar from "./sections/AppBar";
import { Contacts, Ballot, Done } from "@material-ui/icons";
import { BallotContext } from "./contexts/BallotContext";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(9, 1, 4, 1),
		backgroundColor: "#ececec",
	},
	avatar: {
		height: theme.spacing(10),
		width: theme.spacing(10),
		marginRight: theme.spacing(2),
	},
	displayFlex: { display: "flex", alignItems: "flex-start" },
	icon: { marginRight: theme.spacing(1), fontSize: 50, color: "#007AF7" },
	listItem: { background: "#fff", marginTop: theme.spacing(1) },
	list: { marginBottom: theme.spacing(4) },
	welcome: { marginLeft: theme.spacing(2) },
}));
const positions = [
	{
		position_name: "President",
		position_description: "President of the Student Council",
	},
	{
		position_name: "Vice President-Internal",
		position_description: "Vice President-Internal of the Student Council",
	},
	{
		position_name: "Vice President-External",
		position_description: "Vice President-External of the Student Council",
	},
	{
		position_name: "Secretary",
		position_description: "Secretary of the Student Council",
	},
	{
		position_name: "Treasurer",
		position_description: "Treasurer of the Student Council",
	},
	{
		position_name: "Public Relations Officer",
		position_description: "Public Relations Officer of the Student Council",
	},
	{
		position_name: "1st Year Representative",
		position_description: "1st Year Representative of the Student Council",
	},
	{
		position_name: "2nd Year Representative",
		position_description: "2nd Year Representative of the Student Council",
	},
	{
		position_name: "3rd Year Representative",
		position_description: "3rd Year Representative of the Student Council",
	},
];
function Home() {
	const classes = useStyles();
	const [selectedCandidates] = useContext(BallotContext);
	const [value, setValue] = useState(0);
	return (
		<Slide in={true} direction='left'>
			<div>
				<CustomAppBar />
				<div className={classes.root}>
					{value === 0 && (
						<>
							<div className={classes.welcome}>
								<Typography variant='h6'>Welcome John!</Typography>
								<Typography variant='body2' color='textSecondary'>
									Click on a position to get started.
								</Typography>
							</div>
							<Grid container style={{ marginTop: 10, marginBottom: 30 }}>
								{positions.map((_) => (
									<PositionCard
										key={_.position_name}
										position_name={_.position_name}
										position_description={_.position_description}
									/>
								))}
							</Grid>
						</>
					)}
					{value === 1 && (
						<>
							<div className={classes.welcome}>
								<Typography variant='h6'>Vote Summary</Typography>
								<Typography variant='body2' color='textSecondary'>
									You voted for the following candidates
								</Typography>
							</div>
							<List className={classes.list}>
								{positions.map((_) => (
									<ListItem
										alignItems='flex-start'
										button
										key={_.position_name}
										className={classes.listItem}>
										<ListItemAvatar>
											<Avatar
												variant='rounded'
												src={
													selectedCandidates
														? selectedCandidates[_.position_name]
															? `/images/candidates/${_.position_name}_${
																	selectedCandidates[_.position_name].party
															  }.jpg`
															: "/"
														: "/"
												}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={
												selectedCandidates
													? selectedCandidates[_.position_name]
														? `${
																selectedCandidates[_.position_name].firstName
														  } ${
																selectedCandidates[_.position_name].lastName
														  } `
														: "No Candidate Selected"
													: "No Candidate Selected"
											}
											secondary={_.position_name}
										/>
									</ListItem>
								))}
							</List>
						</>
					)}
				</div>
				<BottomNavigation
					style={{ position: "fixed", bottom: 0, width: "100%" }}
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					showLabels>
					<BottomNavigationAction label='Candidates' icon={<Contacts />} />
					<BottomNavigationAction label='Summary' icon={<Ballot />} />
				</BottomNavigation>
			</div>
		</Slide>
	);
}

const PositionCard = ({ position_name, position_description }) => {
	const classes = useStyles();
	const [selectedCandidates] = useContext(BallotContext);

	return (
		<Grid item xs={12}>
			<ListItem
				button
				component='a'
				href={`/candidates/${position_name}`}
				alignItems='flex-start'
				className={classes.listItem}>
				<ListItemAvatar>
					<Avatar src='/images/logo.png' alt='logo' />
				</ListItemAvatar>
				<ListItemText
					primary={position_name}
					secondary={position_description}
				/>
				{selectedCandidates ? (
					selectedCandidates[position_name] ? (
						<Chip label='Done' icon={<Done />} color='primary' />
					) : null
				) : null}
			</ListItem>
		</Grid>
	);
};
export default Home;
