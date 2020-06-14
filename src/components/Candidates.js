import React, { useState, useContext } from "react";
import {
	Slide,
	Typography,
	makeStyles,
	Grid,
	Card,
	CardContent,
	Avatar,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@material-ui/core";
import CustomAppBar from "./sections/AppBar";
import {
	VisibilityOutlined,
	CheckCircleOutlineOutlined,
	InfoOutlined,
} from "@material-ui/icons";
import { BallotContext } from "./contexts/BallotContext";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(9.5, 1, 4, 1),
		backgroundColor: "#ececec",
		minHeight: "90vh",
	},
	avatar: {
		width: theme.spacing(8),
		height: theme.spacing(8),
		marginRight: theme.spacing(2),
	},
	candidateTitleAndImage: {
		display: "flex",
		alignItems: "flex-start",
		marginBottom: theme.spacing(2),
	},
	btnHolder: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginTop: theme.spacing(1),
	},
	btn: {
		width: "40%",
		borderRadius: 20,
	},
	displayFlex: {
		display: "flex",
		alignItems: "flex-start",
		marginTop: theme.spacing(2),
	},
}));
const candidates = [
	{
		firstName: "Leanne",
		lastName: "Graham",
		position: "President",
		party: "Republicans",
	},
	{
		firstName: "Ervin",
		lastName: "Howell",
		position: "President",
		party: "Democrats",
	},
	{
		firstName: "Clementine",
		lastName: "Bauch",
		position: "Vice President-Internal",
		party: "Republicans",
	},
	{
		firstName: "Patricia",
		lastName: "Lebsack",
		position: "Vice President-Internal",
		party: "Democrats",
	},
	{
		firstName: "Chelsey",
		lastName: "Dietrich",
		position: "Vice President-External",
		party: "Republicans",
	},
	{
		firstName: "Dennis",
		lastName: "Schulist",
		position: "Vice President-External",
		party: "Democrats",
	},
	{
		firstName: "Kurtis",
		lastName: "Weissnat",
		position: "Secretary",
		party: "Republicans",
	},
	{
		firstName: "Nicholas",
		lastName: "Runolfsdottir",
		position: "Secretary",
		party: "Democrats",
	},
	{
		firstName: "Glenna",
		lastName: "Reichert",
		position: "Treasurer",
		party: "Republicans",
	},
	{
		firstName: "Clementina",
		lastName: "DuBuque",
		position: "Treasurer",
		party: "Democrats",
	},
	{
		firstName: "Jayne",
		lastName: "Kuhic",
		position: "Public Relations Officer",
		party: "Republicans",
	},
	{
		firstName: "Presley",
		lastName: "Mueller",
		position: "Public Relations Officer",
		party: "Democrats",
	},
	{
		firstName: "Mallory",
		lastName: "Kunze",
		position: "1st Year Representative",
		party: "Republicans",
	},
	{
		firstName: "Meghan",
		lastName: "Littel",
		position: "1st Year Representative",
		party: "Democrats",
	},
	{
		firstName: "Carmen",
		lastName: "Keeling",
		position: "2nd Year Representative",
		party: "Republicans",
	},
	{
		firstName: "Veronica",
		lastName: "Goodwin",
		position: "2nd Year Representative",
		party: "Democrats",
	},
	{
		firstName: "Oswald",
		lastName: "Vandervort",
		position: "3rd Year Representative",
		party: "Republicans",
	},
	{
		firstName: "Maynard",
		lastName: "Hodkiewicz",
		position: "3rd Year Representative",
		party: "Democrats",
	},
];
function Candidates(props) {
	const classes = useStyles();
	const [selectedCandidates, setSelectedCandidates] = useContext(BallotContext);
	const position = props.match.params.position;
	const _candidates = candidates.filter(
		(candidate) => candidate.position === position
	);
	const [voted, setVoted] = useState(
		selectedCandidates ? selectedCandidates[position] : null
	);
	const handleVote = (_selectedCandidate) => {
		setVoted(_selectedCandidate);
		setSelectedCandidates({
			...selectedCandidates,
			[position]: _selectedCandidate,
		});
	};
	return (
		<Slide in={true} direction='left'>
			<div>
				<CustomAppBar page={position} />
				<div className={classes.root}>
					<Typography variant='h6'>Candidates for {position}</Typography>
					<Grid container spacing={2} style={{ marginTop: 10 }}>
						{_candidates.map((candidate) => (
							<CandidateCard
								candidate={candidate}
								voted={voted}
								handleVote={handleVote}
								key={candidate.lastName}
							/>
						))}
					</Grid>
					{Boolean(voted) && (
						<div className={classes.displayFlex}>
							<InfoOutlined
								fontSize='small'
								color='primary'
								style={{ marginRight: 10 }}
							/>
							<Typography variant='caption' color='textSecondary'>
								Candidates marked with `Voted` are the ones you have voted.
							</Typography>
						</div>
					)}
				</div>
			</div>
		</Slide>
	);
}

const CandidateCard = ({ candidate, voted, handleVote }) => {
	const classes = useStyles();
	const [state, setState] = useState(false);
	const toggle = () => {
		setState(!state);
	};
	return (
		<Grid item xs={12} sm={6}>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={state}
				onClose={toggle}>
				<DialogTitle>Vote</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to vote for this candidate? This action cannot
						be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggle} color='primary'>
						No
					</Button>
					<Button
						onClick={() => {
							handleVote(candidate);
							toggle();
						}}
						color='primary'
						autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<Card>
				<CardContent>
					<div className={classes.candidateTitleAndImage}>
						<Avatar
							variant='rounded'
							src={`/images/candidates/${candidate.position}_${candidate.party}.jpg`}
							alt={candidate.firstName}
							className={classes.avatar}
						/>
						<div>
							<Typography variant='h6'>
								{candidate.firstName} {candidate.lastName}
							</Typography>
							<Typography variant='caption' color='textSecondary' gutterBottom>
								Party : {candidate.party}
							</Typography>
						</div>
					</div>
					<Typography variant='caption' color='textSecondary'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
						suscipit quam unde nemo iste cupiditate minima eum libero.
					</Typography>
					<div className={classes.btnHolder}>
						<Button
							variant='outlined'
							color='primary'
							className={classes.btn}
							startIcon={<VisibilityOutlined />}>
							Profile
						</Button>
						<Button
							onClick={toggle}
							disabled={Boolean(voted)}
							variant='contained'
							color='primary'
							className={classes.btn}
							startIcon={<CheckCircleOutlineOutlined />}>
							{voted
								? voted.lastName === candidate.lastName
									? "Voted"
									: "Vote"
								: "Vote"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</Grid>
	);
};
export default Candidates;
