import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

const Header = function() {
	const boxClass = {
		display: {
			xs: "none",
			sm: "block"
		}
	};
	const buttonClass = {
		color: "#fff"
	};
	const onSignOut = (event: React.MouseEvent<HTMLButtonElement>) =>  {
		event.preventDefault();
		localStorage.removeItem("userData");

	};
	return (
		<AppBar component="nav">
			<Toolbar>
				<Box sx={boxClass}>
					<Button sx={buttonClass} href="/">
						Home
					</Button>
					<Button sx={buttonClass} href="/signIn">
						Sign in
					</Button>
					<Button sx={buttonClass} href="/signUp">
						Sign up
					</Button>
					<Button sx={buttonClass} onClick={onSignOut}>
						Sign out
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;