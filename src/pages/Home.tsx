import React from 'react';
import '../App.scss';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Card from '../components/Card/Card';

type InfoType = {
	count: number,
	pages: number,
	next: string,
	prev: string
};
type CharacterItemType = {
	id: number,
	image: string,
	name: string,
	status: string,
	location: LocationType
};
export type LocationType = {
	name: string
};

const Home = function() {
	const [results, setResults] = React.useState([]);
	const [info, setInfo] = React.useState<InfoType>();
	let [pageNum, setPageNum] = React.useState(1);
	let api = `https://rickandmortyapi.com/api/character/?page=${pageNum}`;

	React.useEffect(() => {
		async function loadCharacters() {
			const res = await fetch(api)
				.then(res => res.json())
				.catch(error => {
					console.error(error);
				});
			setResults(res.results);
			setInfo(res.info);
		};
		loadCharacters();
	}, [api]);

	const onHandleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPageNum(value);
	};

	const paginationStyle = {
		'display': 'flex',
		'justifyContent': 'center',
		'margin': '40px'
	};
	return (
		<Container maxWidth="lg">
			<Typography
				sx={{ 'paddingTop': '10vh' }}
				align='center'
				variant='h3'
				gutterBottom={true}
			>
			List of characters
			</Typography>
			<Pagination count={info?.pages} page={pageNum} variant="outlined" shape="rounded"
				color="primary" size="large" onChange={onHandleChange} sx={paginationStyle} />
			<Grid container>
				{results.map((item: CharacterItemType) => (
					<Grid item key={item.id} xs={12} sm={6} md={6} lg={4}>
						<Card id={item.id} name={item.name} image={item.image} status={item.status} location={item.location} />
					</Grid>
				))}
			</Grid>
			<Pagination className="paginationClass" count={info?.pages} page={pageNum} variant="outlined" shape="rounded"
				color="primary" size="large" onChange={onHandleChange} sx={paginationStyle} />
		</Container>
	);
}

export default Home;