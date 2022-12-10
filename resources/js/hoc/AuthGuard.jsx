import {Navigate} from 'react-router-dom';

const AuthGuard = ({children}) => {
    const isAuth = !!localStorage.getItem('access_token')

    if(!isAuth) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default AuthGuard
