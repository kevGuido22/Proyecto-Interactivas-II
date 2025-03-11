import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'
import { Input } from '../components/Input'
import { UserIcon } from '../components/Icons/UserICon'
import { LockIcon } from '../components/Icons/LockIcon'
import { useState, useContext } from 'react'
import { modalContext } from './../context/modalContext';
import axios from 'axios'

export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setUser } = useContext(modalContext);
    const navigate = useNavigate()

    const handleChange = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value)
        } else if (event.target.name === 'password') {
            setPassword(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const username = event.target.username.value;
        const password = event.target.password.value;
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/users/login",
                // 'http://jint_backend.test/api/users/login',
                {
                    username,
                    password,
                }
            )
            const data = await response.data
            const user = data.user;
            if(user){
                console.log(user);
                setUser(user);
                window.localStorage.setItem('userLogged', JSON.stringify(user));
                navigate(ROUTE_PATHS.HOME);
            }

        } catch (error) {
            console.error(
                'Error logging in:',
                error.response ? error.response.data : error.message
            )
            if (error.response && error.response.status === 401) {
                setError('Username or password is incorrect.')
            } else {
                setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.')
            }
        }
    }

    return (
        <section className="flex flex-col justify-center items-center h-screen bg-primary">
            <div className="flex flex-col items-center justify-center w-80">
                <h2 className="font-bold text-3xl text-center text-white mb-2">
                    User Login
                </h2>
                <p className="text-center text-white">
                    Welcome! Enter your details to login into your account
                </p>

               

                <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex flex-col gap-6 w-full mb-10"
                >
                    <Input
                        title={'User'}
                        name={'username'}
                        inputId={'username'}
                        value={username}
                        onChange={handleChange}
                        icon={<UserIcon />}
                        type={'text'}
                    />
                    <Input
                        title={'Password'}
                        name={'password'}
                        inputId={'password'}
                        value={password}
                        onChange={handleChange}
                        icon={<LockIcon />}
                        type={'password'}
                    />

                {error && (
                    <div className="bg-violet-400 text-white p-4 rounded-lg w-full text-center mt-2 -mb-1">
                        {error}
                        <p className="text-white font-semibold text-xs">
                    forgot your password?{' '}
                    <NavLink
                        className="font-regular underline decoration-1"
                        to={ROUTE_PATHS.EMAIL_CONFIRMATION}
                    >
                        click here
                    </NavLink>
                </p>
                    </div>
                )}

                    <input
                        className="w-full text-white bg-dark font-semibold rounded-xl px-8 py-2 cursor-pointer border-2 mt-2 border-dark hover:bg-white hover:text-dark transition-colors duration-200"
                        type="submit"
                        value="Login"
                    />
                </form>
                <p className="text-white">
                    Don’t you have an account?{' '}
                    <NavLink
                        className="font-bold underline decoration-2"
                        to={ROUTE_PATHS.SIGN_UP}
                    >
                        REGISTER
                    </NavLink>
                </p>
            </div>
        </section>
    )
}

