import React from 'react'
import Typography from '@mui/material/Typography'
import {useHttp} from '../hooks/useHttp'
import {useNavigate, useLocation} from 'react-router-dom'

type DataType = {
	email: string,
	bio: string,
	isOk: boolean,
	message?: string
}
type credentialUserType = {
	userId: string,
	token: string
}
type UserDataType = {
	email: string,
	bio: string
}
const Bio = function() {
	const navigate = useNavigate();
	const {	loading, request } = useHttp();
	const navItems: credentialUserType = useLocation().state;
	const [userData, setUserData] = React.useState<UserDataType>({
		"email": "",
		"bio": ""
	});
	const getUserData = async (items: credentialUserType) => {
		try {
			const userDataById: any = await request(`/api/bio/${items.userId}`, 'GET');
			setUserData(userDataById);
		} catch (e) {
			throw e;
		}
	}
	React.useEffect(() => {
		const items: credentialUserType = navItems || JSON.parse(localStorage.getItem("userData") || "{}");
		if (Object.keys(items).length) {
			getUserData(items);
		} else {
			navigate(`/`);
		}
	}, []);

	return (
		<>
			<Typography
				sx={{ 'paddingTop': '10vh' }}
				align='center'
				variant='h4'
			>
			Email: {userData.email}
			</Typography>
			<Typography
				align='center'
				variant='h4'
			>
			Bio: {userData.bio}
			</Typography>
		</>
	);
}

export default Bio;