import React, { useState } from "react";
import {
	Typography,
	Container,
	makeStyles,
	Grid,
	InputLabel,
	Button,
	FormHelperText,
	Backdrop,
	CircularProgress,
	Slide,
} from "@material-ui/core";
import { BootstrapInput } from "../styledInputs/Inputs";
import { isEmail } from "validator";
const useStyles = makeStyles((theme) => ({
	title: {
		textAlign: "center",
		margin: theme.spacing(1),
		marginTop: -15,
	},
	mainTitle: {
		fontWeight: 600,
	},
	btn: {
		textTransform: "none",
		position: "relative",
		borderRadius: 20,
	},
	form: {
		margin: theme.spacing(0, 2),
	},
	backdrop: {
		zIndex: theme.zIndex.appBar + 2,
	},
}));
const initialValues = {
	email: "",
	password: "",
};
const initialErrors = {
	email: false,
	password: false,
	email_error: "",
	password_error: "",
};
function Login() {
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setErrors({ ...errors, [e.target.name]: false });
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const checkField = (e) => {
		if (!e.target.value) {
			return setErrors({
				...errors,
				[e.target.name]: true,
				[e.target.name + `_error`]: `${e.target.name} is required.`,
			});
		}
	};
	const handleSubmit = () => {
		if (!values.email || !values.password) {
			return;
		}
		if (!isEmail(values.email)) {
			return setErrors({
				...errors,
				email: true,
				email_error: "Please enter a valid email.",
			});
		}
		setLoading(true);

		// login logic here
		setTimeout(() => {
			setLoading(false);
			window.location.replace("/home");
		}, 3000);
	};
	return (
		<Slide in={true} direction='left'>
			<div>
				<Backdrop open={loading} className={classes.backdrop}>
					<CircularProgress color='inherit' />
				</Backdrop>
				<Container
					fixed
					maxWidth='md'
					style={{ textAlign: "center", marginTop: 20 }}>
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
					<div className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<InputLabel
									shrink
									htmlFor='email'
									color='textPrimary'
									style={{ textAlign: "left" }}>
									Email
								</InputLabel>
								<BootstrapInput
									autoFocus
									fullWidth
									name='email'
									onChange={handleChange}
									onBlur={checkField}
									error={errors.email}
								/>
								{errors.email && (
									<FormHelperText style={{ color: "red" }}>
										{errors.email_error}
									</FormHelperText>
								)}
							</Grid>
							<Grid item xs={12}>
								<InputLabel
									shrink
									htmlFor='password'
									className={classes.color}
									style={{ textAlign: "left" }}>
									Password
								</InputLabel>
								<BootstrapInput
									fullWidth
									type='password'
									name='password'
									onChange={handleChange}
									onBlur={checkField}
									error={errors.password}
								/>
								{errors.password && (
									<FormHelperText style={{ color: "red" }}>
										{errors.password_error}
									</FormHelperText>
								)}
							</Grid>
							<Grid item xs={12}>
								<Button
									onClick={handleSubmit}
									variant='contained'
									color='primary'
									fullWidth
									className={classes.btn}
									size='large'>
									Sign In
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Button
									href='/register'
									variant='outlined'
									color='primary'
									fullWidth
									size='large'
									className={classes.btn}>
									I don't have an account yet.
								</Button>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
		</Slide>
	);
}

export default Login;
