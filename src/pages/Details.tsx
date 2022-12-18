import React from "react";
import { useParams } from "react-router-dom";
import { LocationType } from "./Home";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

type CharactersDetailsType = {
	id: number,
	name: string,
	image: string,
	gender: string,
	location: LocationType,
	origin: OriginType,
	status: string,
	species: string,
	type: string
};
type OriginType = {
	name: string
};

function Details() {
	const { id } = useParams();

	let [character, setCharacter] = React.useState<CharactersDetailsType>({
		id: 0,
		name: "",
		image: "",
		gender: "",
		location: {
			name: ""
		},
		origin: {
			name: ""
		},
		status: "",
		species: "",
		type: ""
	});
	let api = `https://rickandmortyapi.com/api/character/${id}`;

	React.useEffect(() => {
		async function loadCharacter() {
			let data = await fetch(api)
				.then(res => res.json())
				.catch(error => {
					console.error(error);
				});
			setCharacter(data);
		};
		loadCharacter();
	}, [api]);
	const TypographyLabelStyle = {
		textAlign: {
			xs: 'center',
			sm: 'center',
			md: 'right',
			lg: 'right',
			xl: 'right'
		},
		fontWeight: 'bold'
	};
	const TypographyTextStyle = {
		textAlign: {
			xs: 'center',
			sm: 'center',
			md: 'left',
			lg: 'left',
			xl: 'left'
		}
	};
	return (
		<div>
			<Container maxWidth="lg">
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					columns={{ xs: 1, sm: 1, md: 2 }}
					sx={{'paddingTop': '10vh'}}
				>
					<Grid item>
						<img src={character.image} alt="" />
					</Grid>
					<Grid item>
						<div>
							<Typography
								align='center'
								variant='h4'
								gutterBottom
							>
							{character.name}
							</Typography>
							<Box>
								<Grid
									container
									spacing={1}
									columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
								>
									{character.gender &&
										<>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyLabelStyle}
													variant='h6'
												>
												Gender:
												</Typography>
											</Grid>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyTextStyle}
													variant='h6'
												>
												{character.gender}
												</Typography>
											</Grid>
										</>
									}
									{character.location.name &&
										<>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyLabelStyle}
													variant='h6'
												>
												Location:
												</Typography>
											</Grid>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyTextStyle}
													variant='h6'
												>
												{character.location.name}
												</Typography>
											</Grid>
										</>
									}
									{character.status &&
										<>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyLabelStyle}
													variant='h6'
												>
												Status:
												</Typography>
											</Grid>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyTextStyle}
													variant='h6'
												>
												{character.status}
												</Typography>
											</Grid>
										</>
									}
									{character.origin.name &&
										<>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyLabelStyle}
													variant='h6'
												>
												Origin:
												</Typography>
											</Grid>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyTextStyle}
													variant='h6'
												>
												{character.origin.name}
												</Typography>
											</Grid>
										</>
									}
									{character.species &&
										<>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyLabelStyle}
													variant='h6'
												>
												Species:
												</Typography>
											</Grid>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyTextStyle}
													variant='h6'
												>
												{character.species}
												</Typography>
											</Grid>
										</>
									}
									{character.type &&
										<>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyLabelStyle}
													variant='h6'
												>
												Type:
												</Typography>
											</Grid>
											<Grid item xs={1} sm={1} md={1}>
												<Typography
													sx={TypographyTextStyle}
													variant='h6'
												>
												{character.type}
												</Typography>
											</Grid>
										</>
									}
								</Grid>
							</Box>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Details;