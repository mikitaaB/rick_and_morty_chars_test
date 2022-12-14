import "./App.scss";
import useRoutes from "./routes";
import Header from "./components/Header/Header";
import { BrowserRouter as Router} from "react-router-dom";

function App() {
	const routes = useRoutes();
	return (
		<>
			<Header />
			<Router>
				{routes}
			</Router>
		</>
	);
}

export default App;