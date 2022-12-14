import Bio from './pages/Bio'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Details from './pages/Details'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom'

const useRoutes = function() {
	return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/character/:id" element={<Details />} />
        </Routes>
	);
}

export default useRoutes;