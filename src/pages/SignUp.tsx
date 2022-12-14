import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useHttp} from '../hooks/useHttp';

type StateType = {
	email: string,
	password: string,
	bio: string
};
type ResType = {
	isOk: boolean,
	message: string
};
const SignUp = () => {
	const {loading, request} = useHttp();
	const [error, setError] = React.useState<ResType>({
		isOk: false,
		message: ""
	});
	const [isSignUp, setIsSignUp] = React.useState(false);
	const boxStyle = {
		display: "flex",
		justifyContent: "center"
	};

	const onClickSignUp = async () => {
		try {
			const data: ResType = await request('/api/signUp', 'POST', {...values});
			setError(data);
			if (!data.isOk) {
				throw data.message;
			}
			setIsSignUp(true);
		} catch (e) { }
	};
	const onHandleChange = (prop: keyof StateType) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const [values, setValues] = React.useState<StateType>({
		email: "",
		password: "",
		bio: ""
	});
	return (
		<>
			<Typography
				sx={{ "paddingTop": "10vh" }}
				align="center"
				variant="h4"
			>
			Sign Up
			</Typography>
			<Box sx={boxStyle} component="form">
				<div>
					<InputLabel htmlFor="email" sx={{mt: 2}}>Email:</InputLabel>
					<Input
						id="email"
						type="text"
						onChange={onHandleChange("email")}
						value={values.email}
					/>

					<InputLabel htmlFor="password" sx={{mt: 2}}>Password:</InputLabel>
					<Input
						id="password"
						type={"password"}
						onChange={onHandleChange("password")}
						value={values.password}
					/>

					<InputLabel htmlFor="bio" sx={{mt: 2}}>Bio:</InputLabel>
					<Input
						id="bio"
						type={"text"}
						onChange={onHandleChange("bio")}
						value={values.bio}
					/>
					<div>
						{!error.isOk && <Typography
							align="center"
							sx={{mt: 2}}
							variant="h6"
						>
						{error.message}
						</Typography>}
						<Button sx={{mt: 2}} variant="contained" onClick={onClickSignUp} disabled={loading || isSignUp}>
							Sign Up
						</Button>
						{isSignUp && <Typography
							align="center"
							sx={{mt: 2}}
							variant="h6"
						>
						Success
						</Typography>}
					</div>
				</div>
			</Box>
		</>
	);
}

export default SignUp;