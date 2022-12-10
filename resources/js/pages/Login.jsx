import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import Input from "../components/ui/Input";
import api from "../api";

const Login = () => {
    const isAuth = !!localStorage.getItem('access_token')

    if(isAuth) {
        return <Navigate to={'/'} />
    }

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState({hasError: false, errorMessage: ''})
    const [errorPassword, setErrorPassword] = useState({hasError: false, errorMessage: ''})
    const [errorCredentials, setErrorCredentials] = useState(false)

    const handleLogin = (value) => {
        setLogin(value)
        setErrorLogin({hasError: false, errorMessage: ''})
    }


    const handlePassword = (value) => {
        setPassword(value)
        setErrorPassword({hasError: false, errorMessage: ''})
    }

    const validate = () => {
        let isValidLogin = true;
        let isValidPassword = true;

        if(login == '' || login.length < 3) {
            setErrorLogin({hasError: true, errorMessage: 'Введите логин'})
            isValidLogin = false;
        }

        if(password.length < 6) {
            setErrorPassword({hasError: true, errorMessage: 'Пароль должен содержать не менее 6 символов'})
            isValidPassword = false;
        }

        return isValidLogin  && isValidPassword
    }

    const sendForm = (e) => {
        e.preventDefault()
        if(validate()) {
            api.post('/api/auth/login',{
                login: login,
                password: password,
            }).then((res) => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token)
                navigate("/");
            }).catch(error => {
                setErrorCredentials(true)
            })
        }
    }

    return (

        <>
            <Header/>
            <div className="content content--recovery">
                <div className="container">
                    <div className="register">
                        <h2 className="h2 recovery__title register__title">Вход</h2>
                        <div className="register-forms">
                            <form className="refister__form" onSubmit={(e) =>{ sendForm(e)}}>
                                { errorCredentials && <p className="xs text-danger error-message" style={{color: '#F44336'}}>Не верный логин или пароль</p>}
                                <Input type="text" label="Логин" error={errorLogin} handleChange={handleLogin}/>
                                <Input type="password" label="Пароль" error={errorPassword} handleChange={handlePassword}/>
                                <button type="submit" className="btn">Войти</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
