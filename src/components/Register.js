import React, { useState } from "react";
import {
	Typography,
	makeStyles,
	InputLabel,
	Grid,
	FormControl,
	Button,
	Select,
	MenuItem,
	FormHelperText,
	Slide,
	Backdrop,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@material-ui/core";
import { BootstrapInput } from "../styledInputs/Inputs";
import { isEmail } from "validator";
const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: 600,
		margin: theme.spacing(6, 2, 2, 2),
	},
	form: {
		margin: theme.spacing(2),
	},
	secondaryTitle: {
		fontWeight: 500,
		fontSize: 19,
	},
	registrationForm: {
		margin: theme.spacing(2, 0),
	},
	btnHolder: {
		display: "flex",
		width: "90%",
		position: "absolute",
		bottom: theme.spacing(2),
	},
	btn: {
		borderRadius: 20,
	},
	backdrop: {
		zIndex: theme.zIndex.appBar + 2,
	},
}));
const courses = ["BSIT", "BSBA", "BSCS"];
const levels = [1, 2, 3];
const initialValues = {
	studentNo: "",
	firstName: "",
	lastName: "",
	course: "",
	gradeLevel: "",
};
const initialErrors = {
	studentNo: false,
	firstName: false,
	lastName: false,
	course: false,
	gradeLevel: false,
	studentNo_error: "",
	firstName_error: "",
	lastName_error: "",
	course_error: "",
	gradeLevel_error: "",
};
const initialCredentials = {
	email: "",
	password: "",
	confirmpassword: "",
};
const initialCredentialError = {
	email: false,
	password: false,
	confirmpassword: false,
	email_error: "",
	password_error: "",
	confirmpassword_error: "",
};
function Register() {
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);
	const [credentials, setCredentials] = useState(initialCredentials);
	const [credentialErrors, setCredentialError] = useState(
		initialCredentialError
	);
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const checkField = (e) => {
		if (!e.target.value) {
			return setErrors({
				...errors,
				[e.target.name]: true,
				[e.target.name + `_error`]: `${e.target.name} is required.`,
			});
		}
	};
	const handleChange = (e) => {
		setErrors({ ...errors, [e.target.name]: false });
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleNext = () => {
		if (
			!values.firstName ||
			!values.lastName ||
			!values.studentNo ||
			!values.course ||
			!values.gradeLevel
		) {
			return;
		}
		setStep(2);
	};
	const handleCredentials = (e) => {
		setCredentialError({ ...credentialErrors, [e.target.name]: false });
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	const checkCredential = (e) => {
		if (!e.target.value) {
			return setCredentialError({
				...credentialErrors,
				[e.target.name]: true,
				[e.target.name + `_error`]: `${e.target.name} is required.`,
			});
		}
	};
	const handleFinish = () => {
		// validations
		if (!credentials.email || !credentials.password) {
			return;
		}
		if (!isEmail(credentials.email)) {
			return setCredentialError({
				...credentialErrors,
				email: true,
				email_error: "Please enter a valid email",
			});
		}
		if (credentials.password !== credentials.confirmpassword) {
			return setCredentialError({
				...credentialErrors,
				confirmpassword: true,
				confirmpassword_error: "Your passwords do not match",
			});
		}
		// check password pattern
		// should have 8 char; has letter, number, character, has capital
		setValues({
			...values,
			email: credentials.email,
			password: credentials.password,
		});
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setShowDialog(true);
		}, 3000);
		console.log(values);
	};
	return (
		<div>
			<Typography variant='h4' className={classes.title}>
				Let's get you Registered First!
			</Typography>
			<div className={classes.form}>
				<Typography className={classes.secondaryTitle}>
					Tell us something about yourself
				</Typography>
				<Typography variant='body2'>
					Only provide information that is true and correct
				</Typography>
				<div className={classes.registrationForm}>
					{step === 1 ? (
						<Slide in={true} direction='left'>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<InputLabel
										className={classes.color}
										shrink
										htmlFor='studentNo'>
										Student No.
									</InputLabel>
									<BootstrapInput
										autoFocus
										fullWidth
										name='studentNo'
										value={values.studentNo}
										onChange={handleChange}
										error={errors.studentNo}
										onBlur={checkField}
									/>
									{errors.studentNo && (
										<FormHelperText style={{ color: "red" }}>
											{errors.studentNo_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<InputLabel
										className={classes.color}
										shrink
										htmlFor='firstName'>
										First Name
									</InputLabel>
									<BootstrapInput
										fullWidth
										name='firstName'
										value={values.firstName}
										onChange={handleChange}
										error={errors.firstName}
										onBlur={checkField}
									/>
									{errors.firstName && (
										<FormHelperText style={{ color: "red" }}>
											{errors.firstName_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<InputLabel
										className={classes.color}
										shrink
										htmlFor='lastName'>
										Last Name
									</InputLabel>
									<BootstrapInput
										fullWidth
										name='lastName'
										value={values.lastName}
										onChange={handleChange}
										error={errors.lastName}
										onBlur={checkField}
									/>
									{errors.lastName && (
										<FormHelperText style={{ color: "red" }}>
											{errors.lastName_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={8}>
									<FormControl fullWidth style={{ marginTop: 10 }}>
										<InputLabel
											className={classes.color}
											shrink
											htmlFor='course'
											style={{ marginTop: -10 }}>
											Course
										</InputLabel>
										<Select
											input={<BootstrapInput />}
											name='course'
											value={values.course}
											onChange={handleChange}
											error={errors.course}
											onBlur={checkField}>
											<MenuItem disabled value=''>
												Choose Course
											</MenuItem>
											{courses.map((course) => (
												<MenuItem key={course} value={course}>
													{course}
												</MenuItem>
											))}
										</Select>
										{errors.course && (
											<FormHelperText style={{ color: "red" }}>
												{errors.course_error}
											</FormHelperText>
										)}
									</FormControl>
								</Grid>
								<Grid item xs={4}>
									<FormControl fullWidth style={{ marginTop: 10 }}>
										<InputLabel
											className={classes.color}
											shrink
											htmlFor='level'
											style={{ marginTop: -10 }}>
											Year Level
										</InputLabel>
										<Select
											input={<BootstrapInput />}
											name='gradeLevel'
											value={values.gradeLevel}
											onChange={handleChange}
											error={errors.gradeLevel}
											onBlur={checkField}>
											<MenuItem disabled value=''>
												Choose Year Level
											</MenuItem>
											{levels.map((level) => (
												<MenuItem key={level} value={level}>
													{level}
												</MenuItem>
											))}
										</Select>
										{errors.gradeLevel && (
											<FormHelperText style={{ color: "red" }}>
												{errors.gradeLevel_error}
											</FormHelperText>
										)}
									</FormControl>
								</Grid>
								<Grid item xs={12} className={classes.btnHolder}>
									<div style={{ flex: 1 }} />
									<Button
										onClick={handleNext}
										size='large'
										variant='contained'
										color='primary'
										className={classes.btn}>
										Next
									</Button>
								</Grid>
							</Grid>
						</Slide>
					) : (
						<Slide in={true} direction='left'>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<InputLabel className={classes.color} shrink htmlFor='email'>
										Email
									</InputLabel>
									<BootstrapInput
										fullWidth
										name='email'
										value={credentials.email}
										onChange={handleCredentials}
										error={credentialErrors.email}
										onBlur={checkCredential}
									/>
									{credentialErrors.email && (
										<FormHelperText style={{ color: "red" }}>
											{credentialErrors.email_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<InputLabel
										className={classes.color}
										shrink
										htmlFor='password'>
										Password
									</InputLabel>
									<BootstrapInput
										fullWidth
										type='password'
										name='password'
										value={credentials.password}
										onChange={handleCredentials}
										error={credentialErrors.password}
										onBlur={checkCredential}
									/>
									{credentialErrors.password && (
										<FormHelperText style={{ color: "red" }}>
											{credentialErrors.password_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<InputLabel
										className={classes.color}
										shrink
										htmlFor='confirmpassword'>
										Confirm Password
									</InputLabel>
									<BootstrapInput
										fullWidth
										type='password'
										name='confirmpassword'
										value={credentials.confirmpassword}
										onChange={handleCredentials}
										error={credentialErrors.confirmpassword}
										onBlur={checkCredential}
									/>
									{credentialErrors.confirmpassword && (
										<FormHelperText style={{ color: "red" }}>
											{credentialErrors.confirmpassword_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12} className={classes.btnHolder}>
									<Button
										onClick={() => {
											setStep(1);
										}}
										size='large'
										variant='outlined'
										color='primary'
										className={classes.btn}>
										Back
									</Button>
									<div style={{ flex: 1 }} />
									<Button
										onClick={handleFinish}
										size='large'
										variant='contained'
										color='primary'
										className={classes.btn}>
										Finish
									</Button>
								</Grid>
							</Grid>
						</Slide>
					)}
				</div>
			</div>
			<Backdrop open={loading} className={classes.backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Dialog
				open={showDialog}
				disableBackdropClick
				disableEscapeKeyDown
				onClose={() => {
					setShowDialog(false);
				}}>
				<DialogTitle>Registration Successful</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Your Registration will be reviewed by the Election Committee. An
						email will be sent to you once your registration has been approved.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button href='/login' color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

// studentNo.
// firstName
// lastName
// course
// gradeLevel
// email
// password

export default Register;
