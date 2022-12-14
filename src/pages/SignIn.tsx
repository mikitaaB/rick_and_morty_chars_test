import React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {useHttp} from '../hooks/useHttp'
import {useNavigate} from 'react-router-dom'

type StateType = {
	email: string,
	password: string
};
type ResType = {
	isOk: boolean,
	message?: string,
	userId?: string,
	token?: string
};
const SignIn = () => {
	const {loading, request} = useHttp();
	let [isRemember, setIsRemember] = React.useState<boolean>(false);
	const navigate = useNavigate();
	const [error, setError] = React.useState<ResType>({
		isOk: false,
		message: ""
	});
	let isRememberCheckboxValue: boolean = false;
	const [values, setValues] = React.useState<StateType>({
		email: "",
		password: ""
	});

	const boxStyle = {
		display: "flex",
		justifyContent: "center"
	};

	const onClickSignIn = async () => {
		try {
			const data: ResType = await request('/api/signIn', 'POST', {...values});
			setError(data);
			if (!data.isOk) {
				throw data.message;
			}
			if (isRememberCheckboxValue) {
				localStorage.setItem("userData", JSON.stringify({
					"userId": data.userId,
					"token": data.token
				}));
			}
			navigate(`/bio`, {
				state: {
					"userId": data.userId,
					"token": data.token
				}
			});
		} catch (e) {
			throw e;
		}
	};
	React.useEffect(() => {
		isRememberCheckboxValue = isRemember;
	}, [isRemember]);
	const onHandleChange = (prop: keyof StateType) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const onHandleChangeRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsRemember(e.target.checked);
	};

	return (
		<>
			<Typography
				sx={{ 'paddingTop': '10vh' }}
				align='center'
				variant='h4'
			>
			Sign In
			</Typography>
			<Box sx={boxStyle} component="form">
				<div>
					<InputLabel htmlFor="email"sx={{mt: 2}} >Email:</InputLabel>
					<Input
						id="email"
						type="text"
						onChange={onHandleChange("email")}
						value={values.email}
					/>

					<InputLabel htmlFor="password"sx={{mt: 2}} >Password:</InputLabel>
					<Input
						id="password"
						type={"password"}
						onChange={onHandleChange("password")}
						value={values.password}
					/>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={isRemember} onChange={onHandleChangeRememberMe} />} sx={{mt: 2}} label="Remember me" />
					</FormGroup>

					<div>
						{!error.isOk && <Typography
							align="center"
							sx={{mt: 2}}
							variant="h6"
						>
						{error.message}
						</Typography>}
						<Button variant="contained" onClick={onClickSignIn} disabled={loading}>
							Sign In
						</Button>
					</div>
				</div>
			</Box>
		</>
	);
}

export default SignIn;