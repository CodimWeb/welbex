import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import Input from "../components/ui/Input";
import api from "../api";

const Registration = () => {
    const isAuth = !!localStorage.getItem('access_token')

    if(isAuth) {
        return <Navigate to={'/'} />
    }

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorLogin, setErrorLogin] = useState({hasError: false, errorMessage: ''})
    const [errorEmail, setErrorEmail] = useState({hasError: false, errorMessage: ''})
    const [errorPassword, setErrorPassword] = useState({hasError: false, errorMessage: ''})
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState({hasError: false, errorMessage: ''})

    const handleLogin = (value) => {
        setLogin(value)
        setErrorLogin({hasError: false, errorMessage: ''})
    }

    const handleEmail = (value) => {
        setEmail(value)
        setErrorEmail({hasError: false, errorMessage: ''})
    }

    const handlePassword = (value) => {
        setPassword(value)
        setErrorPassword({hasError: false, errorMessage: ''})
    }

    const handlePasswordConfirm = (value) => {
        setPasswordConfirm(value)
        setErrorPasswordConfirm({hasError: false, errorMessage: ''})
    }

    const validate = () => {
        let isValidLogin = true;
        let isValidEmail = true;
        let isValidPassword = true;
        let isValidPasswordConfirm = true;

        if(login == '' || login.length < 3) {
            setErrorLogin({hasError: true, errorMessage: 'Введите логин'})
            isValidLogin = false;
        }

        if(email == '') {
            setErrorEmail({hasError: true, errorMessage: 'Введите email'})
            isValidEmail = false;
        }
        else {
            let re = /\S+@\S+\.\S+/;
            if(!re.test(email)) {
                setErrorEmail({hasError: true, errorMessage: 'Введите корректный email'})
                isValidEmail = false;
            }
        }

        if(password.length < 6) {
            setErrorPassword({hasError: true, errorMessage: 'Пароль должен содержать не менее 6 символов'})
            isValidPassword = false;
        }

        if(passwordConfirm != password || passwordConfirm == '' ) {
            setErrorPasswordConfirm({hasError: true, errorMessage: 'Пароль должен совпадать'})
            isValidPasswordConfirm = false;
        }

        return isValidLogin && isValidEmail && isValidPassword && isValidPasswordConfirm
    }

    const sendForm = (e) => {
        e.preventDefault()
        if(validate()) {
            console.log('send')
            console.log(errorEmail)
            console.log('login', login)
            api.post('/api/registration',{
                login: login,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            }).then((res) => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token)
                navigate("/");
            }).catch(error => {
                if(error.response.data.message == 'Данный login уже занят') {
                    setErrorLogin({
                        hasError: true,
                        errorMessage: error.response.data.message
                    })
                }
                if(error.response.data.message == 'Данный email уже занят'){
                    setErrorEmail({
                        hasError: true,
                        errorMessage: error.response.data.message
                    })
                }
            })
        }
    }

    return (

        <>
            <Header/>
            <div className="content content--recovery">
                <div className="container">
                    <div className="register">
                        <h2 className="h2 recovery__title register__title">Регистрация</h2>
                        <div className="register-forms">
                            <form className="refister__form" onSubmit={(e) =>{ sendForm(e)}}>
                                <Input type="text" label="Логин" error={errorLogin} handleChange={handleLogin}/>
                                <Input type="text" label="Email" error={errorEmail} handleChange={handleEmail}/>
                                <Input type="password" label="Пароль" error={errorPassword} handleChange={handlePassword}/>
                                <Input type="password" label="Повторите пароль" error={errorPasswordConfirm} handleChange={handlePasswordConfirm}/>
                                <button type="submit" className="btn">Зарегистрирвоаться</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration;
