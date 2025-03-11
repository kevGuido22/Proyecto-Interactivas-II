import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes';
import axios from 'axios';

const EmailConfirmation = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendCode = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/send-code', { email });
            // const response = await axios.post('http://jint_backend.test/api/send-code', { email });
            
            console.log('Código enviado al email:', email);
            setIsCodeSent(true);
            setUserId(response.data.userId);
        } catch (error) {
            console.error('Error al enviar el código:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    const handleVerifyCode = async () => {
        try {
            // const response = await axios.post('http://jint_backend.test/api/verify-code', { email, code });
            const response = await axios.post('http://127.0.0.1:8000/api/verify-code', { email, code });
            console.log('Código ingresado:', code);
            console.log('Respuesta del servidor:', response.data);
            navigate(`${ROUTE_PATHS.RESET_PASSWORD}/${response.data.userId}`);
        } catch (error) {
            console.error('Error al verificar el código:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <section className="flex flex-col justify-center items-center min-h-screen bg-primary p-4">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <h2 className="font-bold text-3xl text-center text-white mb-2">
                    Email confirmation
                </h2>
                <p className="text-center text-white">
                    Enter your email to receive a verification code
                </p>

                <form className="mt-4 flex flex-col gap-6 w-full mb-10">
                    {!isCodeSent ? (
                        <div className="shadow-main p-2 rounded-xl bg-white flex gap-2">
                            <input
                                className="w-full"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="shadow-main p-2 rounded-xl bg-white flex gap-2">
                            <input
                                className="w-full"
                                type="text"
                                placeholder="Enter your code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    )}

                    {!isCodeSent ? (
                        <button
                            type="button"
                            className="text-white bg-white/30 rounded-xl w-fit m-auto px-8 py-2 cursor-pointer hover:bg-white hover:text-primary hover:font-semibold"
                            onClick={handleSendCode}
                        >
                            Send Code
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="text-white bg-white/30 rounded-xl w-fit m-auto px-8 py-2 cursor-pointer hover:bg-white hover:text-primary hover:font-semibold"
                            onClick={handleVerifyCode}
                        >
                            Verify Code
                        </button>
                    )}
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </section>
    );
};

export default EmailConfirmation;


