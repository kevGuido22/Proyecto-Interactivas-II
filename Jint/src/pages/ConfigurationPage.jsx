import { useState, useContext } from 'react'
import { Dropdown } from '../components/Dropdown'
import { InputConfig } from '../components/InputConfig'
import { modalContext } from '../context/modalContext'
import { useEffect } from 'react'
import axios from 'axios';
import { DropdownConfig } from '../components/DropdownConfig'
import { ROUTE_PATHS } from '../routes'

// import { Checkbox } from '../components/Checkbox'


export function ConfigurationPage() {
    const {theme, setTheme, user} = useContext(modalContext)
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [sleep_range, setSleepRange] = useState('');
    const [exercise, setExercise] = useState('');
    const [condition, setCondition] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user && user.id) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/usersData/show/${user.id}`);
                    // const response = await axios.get(`http://jint_backend.test/api/usersData/show/${user.id}`);

                    const userData = response.data;
                    setAge(userData.age || '');
                    setGender(userData.gender || '');
                    setSleepRange(userData.sleep_range || '');
                    setExercise(userData.exercise || '');
                    setCondition(userData.condition || '');
                }
            } catch (error) {
                console.error('Error showing the information:', error);
            }
        };
        
        fetchUserData();
    }, [user]);



    const handleUserData = async (e) => {
        e.preventDefault();
        const age = e.target.age.value;
        const gender = e.target.gender.value;
        const sleep_range = e.target.sleep_range.value;
        const exercise = e.target.exercise.value;
        const condition = e.target.condition.value;
        const user_profile_id = user.id;
        console.log(user_profile_id);
        const userData = {
            age,
            gender,
            sleep_range: sleep_range,
            exercise,
            condition,
            user_profile_id: user.id
        };
        

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/usersData/store`, userData, {
        //  const response = await axios.post(`http://jint_backend.test/api/usersData/store`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            setMessage('Information successfully registered');
            setMessageType('success'); 
        } catch (error) {
            setMessage('Error when registering the information');
            setMessageType('error');
        }
    };
    
    
    const handleThemeChange = (event) => {
        setTheme(event.target.value)
    }

    useEffect(() => {
        if (theme === 'light') {
            document.querySelector('html').classList.remove('dark')
            window.localStorage.setItem('theme', 'light')
            setTheme('light');
        } else {
            document.querySelector('html').classList.add('dark')
            window.localStorage.setItem('theme', 'dark')
            setTheme('dark');
        }
    }, [theme])

    const filterOptions = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
    ]

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'unknown', label: 'Unknown' },
        { value: '-', label: '-' },
    ]

    const sleepRangeOptions = [
        { value: '0-2', label: '0-2 hour' },
        { value: '2-4', label: '2-4 hour' },
        { value: '4-6', label: '4-6 hour' },
        { value: '6-8', label: '6-8 hour' },
        { value: '8-10', label: '8-10 hour' }, 
        { value: '-', label: '-' },
    ]

    const exerciseOptions = [
        { value: '0-2', label: '0-2 hour' },
        { value: '2-4', label: '2-4 hour' },
        { value: '4-6', label: '4-6 hour' },
        { value: '6-8', label: '6-8 hour' },
        { value: '8-10', label: '8-10 hour' },
        { value: '-', label: '-' },
    ]
    
    const conditionOptions = [
        { value: 'Hypertension', label: 'Hypertension' },
        { value: 'Diabetes', label: 'Diabetes' },
        { value: 'Asthma', label: 'Asthma' },
        { value: 'Arthritis', label: 'Arthritis' },
        { value: 'Depression', label: 'Depression' },
        { value: 'Anxiety', label: 'Anxiety' },
        { value: 'Allergies', label: 'Allergies' },
        { value: 'Obesity', label: 'Obesity' },
        { value: 'Heart Disease', label: 'Heart Disease' },
        { value: 'Chronic Pain', label: 'Chronic Pain' },
        { value: 'None', label: 'None' },
        { value: '-', label: '-' },
    ]




    

    return (
        <>
            {/* CONFIGURATION */}
            <div className=" grid gap-16 px-4 pb-20 dark:text-white configuration lg:px-[5rem] xl:ml-[16rem] xl:px-0 xl:pt-6">
                <section className="grid text">
                    <div className="grid gap-7 ">
                        <div>
                            <h3 className="text-xl font-semibold">Profile</h3>
                            <img className="mt-2" src="/line.png" alt="" />
                        </div>
                        <section className="grid sm:flex gap-8">
                            <div className="flex flex-col items-center">
                                <img
                                    className="w-24 rounded-full bg-black aspect-square"
                                    src="https://unavatar.io/Kevingu08"
                                    alt=""
                                />
                                <span className="text-lg ml-3">
                                    Your Picture
                                </span>
                            </div>
                            <div className="text-base grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 font-medium text-zinc-700">
                                <div className="flex flex-wrap gap-9">
                                    <InputConfig
                                        title="First Name"
                                        inputId="first-name-input"
                                        type="text" 
                                        value={user.name}
                                    
                                    />
                                    <InputConfig
                                        title="Last Name"
                                        inputId="last-name-input"
                                        type="text"
                                        value={user.lastname}

                                    />
                                </div>
                                {/* <div>
                                    <InputConfig
                                        title="Phone Number"
                                        inputId="phone-number-input"
                                        type="text"
                                    />
                                </div> */}
                            </div>
                        </section>
                    </div>
                </section>

                <section className="grid text-2xl gap-7">
                    <div className="grid gap-7">
                        <div>
                            <h3 className="text-xl font-semibold">
                                My Account
                            </h3>
                            <img className="mt-2" src="/line.png" alt="" />
                        </div>
                        <div className="text-base grid gap-2">
                            <div className="grid gap-5">
                                <InputConfig
                                    title="Email"
                                    inputId="email-input"
                                    type="email"
                                    value={user.email}
                                />
                                <a href={ROUTE_PATHS.EMAIL_CONFIRMATION} className="w-48 h-7 rounded-lg border-[.12rem] border-primary text-xs font-semibold grid justify-center items-center transition-all duration-100  hover:bg-primary hover:text-white  dark:bg-dark-secondary">
                                    Change Password
                                </a>
                                
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 font-semibold">
                    <div>
                        <h3 className="text-xl font-semibold">Preferences</h3>
                        <img className="mt-2" src="/line.png" alt="" />
                    </div>

                    <div className="text-base gap-8">
                        <div className="grid gap-1">
                            <span>Theme</span>
                            <p className="text-gray text-xs">
                                Customize how Jint looks on your device
                            </p>
                            <Dropdown
                                options={filterOptions}
                                selectedValue={theme}
                                onChangeFunction={handleThemeChange}
                            />
                            
                        </div>
                    </div>
                </section>
                
                <section className="grid gap-7 mt-2">
                    <div className="grid gap-7">
                        <div>
                            <h3 className="text-xl font-semibold">
                                Personal Data
                            </h3>
                            <img className="mt-2" src="/line.png" alt="" />
                        </div>
                        {message && (
                            <div className={`p-4 w-5/12 rounded-md ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                {message}
                            </div>
                        )}
                        <form className="grid gap-8" onSubmit={handleUserData}>
                            <div className='grid gap-2'>
                                <span className='text-base font-bold' >Age</span>
                                <input 
                                    id="age"
                                    type="number"
                                    name="age"
                                    className="w-full h-10 border border-gray border-opacity-90 px-4 py-2 rounded-md bg-input-bg bg-opacity-50 dark:bg-dark-secondary dark:text-white xl:w-96"
                                    // placeholder='-'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    
                                />
                            </div>
                            
                            <div className='gap-2'>
                                <span className='text-base font-bold'>Gender</span>
                                <DropdownConfig 
                                    options={genderOptions} 
                                    name="gender" 
                                    inputId="gender" 
                                    selectedValue={gender}
                                    onChangeFunction={(e) => setGender(e.target.value)}

                                />
                            </div>

                            <div className="grid gap-2">
                                <span className='text-base font-bold'>Sleep Range</span>
                                <DropdownConfig 
                                    options={sleepRangeOptions} 
                                    name="sleep_range" 
                                    inputId="sleep_range" 
                                    selectedValue={sleep_range}
                                    onChangeFunction={(e) => setSleepRange(e.target.value)}

                                />
                            </div>

                            <div className="grid gap-2">
                                <span className='text-base font-bold'>Exercise</span>
                                <DropdownConfig 
                                    options={exerciseOptions} 
                                    name="exercise" 
                                    inputId="exercise"
                                    selectedValue={exercise} 
                                    onChangeFunction={(e) => setExercise(e.target.value)}
                                    
                                />
                            </div>

                            <div className="grid gap-2">
                                <span className='text-base font-bold'>Condition</span>
                                <DropdownConfig 
                                    options={conditionOptions} 
                                    name="condition" 
                                    inputId="condition" 
                                    selectedValue={condition}
                                    onChangeFunction={(e) => setCondition(e.target.value)}
                                    
                                />
                            </div>


                            <button type='submit' className="w-48 h-7 bg-violet-400 rounded-lg border border-sky-600 text-xs font-semibold grid justify-center items-center text-white hover:bg-violet-500">
                                Save Changes
                            </button>


                        </form>
                    </div>
                </section>

                
            </div>
        </>
    )
}
