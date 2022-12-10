import { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, removeUser} from "../store/slices/userSlice";
import api from "../api";

const Header = () => {

    const isAuth = !!localStorage.getItem('access_token')
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth) {
            dispatch(fetchUser())
        }
    }, [])

    const logout = () => {
        api.post('/api/auth/logout').then(() => {
            localStorage.removeItem('access_token')
            dispatch(removeUser())
            navigate('/');
        })
    }

    return (
        <div className="header" >
            <div className="container">
                <div className="row" style={{margin: '0', padding: '15px 0'}}>
                    <div className="col s3">
                        <Link to={"/"}>Logo</Link>
                    </div>
                    <div className="col s5">Nav</div>
                    <div className="col s4 right-align">
                        {isAuth ?
                            <>
                                <span style={{marginRight: '25px'}}>{user.login}</span>
                                <button className="btn" onClick={logout}>Выход</button>
                            </>
                            :
                            <>
                                <Link to={'/login'}>Вход</Link>
                                /
                                <Link to={'/registration'} className="header__btn-auth link">Регистрация</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default Header
