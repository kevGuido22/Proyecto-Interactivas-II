import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
    const { userId } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (password === confirmPassword) {
            try {
                // const response = await axios.post(`http://jint_backend.test/api/change-password/${userId}`, {
                const response = await axios.post(`http://127.0.0.1:8000/api/change-password/${userId}`, {

                    password,
                    password_confirmation: confirmPassword,
                    
                });
                setMessage(response.data.message);

                navigate(ROUTE_PATHS.LOGIN);
                
            } catch (error) {
                setMessage(error.response ? error.response.data.message : 'An error occurred');
            }
        } else {
            setMessage('The passwords do not match');
        }
    };

    return (
        <section className="flex flex-col justify-center items-center min-h-screen bg-primary p-4">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <h2 className="font-bold text-3xl text-center text-white mb-2">
                    Cambio de Contraseña
                </h2>
                <p className="text-center text-white">
                    Ingresa tu nueva contraseña
                </p>

                <form className="mt-4 flex flex-col gap-6 w-full mb-10">
                    <div className="shadow-main p-2 rounded-xl bg-white flex gap-2">
                        <input
                            className="w-full"
                            type="password"
                            placeholder="Nueva Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="shadow-main p-2 rounded-xl bg-white flex gap-2">
                        <input
                            className="w-full"
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="text-white bg-white/30 rounded-xl w-fit m-auto px-8 py-2 cursor-pointer hover:bg-white hover:text-primary hover:font-semibold"
                        onClick={handleChangePassword}
                    >
                        Cambiar Contraseña
                    </button>
                </form>
                {message && <p className="text-white mt-4">{message}</p>}
            </div>
        </section>
    );
};

export default ChangePassword;


