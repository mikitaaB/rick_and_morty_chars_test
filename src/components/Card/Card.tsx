import './Card.scss';
import { Link } from "react-router-dom";
import { LocationType } from "../../pages/Home";

type CharacterItemType = {
	id: number,
	image: string,
	name: string,
	status: string,
	location: LocationType
};

function Ticket(props: CharacterItemType) {
	return (
		<Link
			to={`/character/${props.id}`}
			key={props.id}
		>
			<div className="card">
				<p className="imageContainer">
					<img className="image" src={props.image} alt="" />
				</p>
				<div className="content">
					<div className="cardName">{props.name}</div>
					<div>Status: {props.status}</div>
					<div>Location: {props.location.name}</div>
				</div>
			</div>
		</Link>
	);
}

export default Ticket;