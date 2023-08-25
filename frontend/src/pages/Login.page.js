import { useContext, useEffect, useState } from "react";
import { Button, Card, Input } from "../components";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { UserContext } from "../layouts";


export default function Login(props) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [state, setState] = useState({
    input: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: ''
    },
    errorMessage: ''
  })

  useEffect(() => {
    if (user?.token) {
      navigate('/jobs');
    }
  })

  const handleChange = (e) => {
    let errors = state.errors;
    errors[e.target.name] = '';

    setState(prev => ({
      ...prev,
      input: {
        ...prev.input,
        [e.target.name]: e.target.value
      },
      errors: errors
    }))
  }

  const handleSubmit = () => {
    AuthService.login(state.input.email, state.input.password)
      .then((res) => {
        navigate('/jobs');
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          errorMessage: error.message
        }))
      })
  }

  return(
    <div className="w-fit m-auto min-h-screen flex flex-col justify-center items-center">
      <Card dropShadow={true} hover={false} >
        <div className="p-4 min-w-[399px] min-h-[399px] m-auto box-sizing">
          <h1 className="text-xl mb-10 text-center">Login</h1>
          <span className="text-base text-red-500" >{state.errorMessage}</span>
          <div action="" className="flex flex-col gap-y-4 justify-center items-center">
            <Input
              name={'email'}
              type={'email'}
              title={'Email Address'}
              placeholder={'Enter Email Address'}
              value={state.input.email}
              required={true}
              onChange={handleChange}
              error={state.errors.email}
            />
            <Input
              name={'password'}
              type={'password'}
              title={'Password'}
              placeholder={'Enter Password'}
              value={state.input.password}
              required={true}
              onChange={handleChange}
              error={state.errors.password}
            />
            <Button
              text={'Login'}
              typeColor={'primary'}
              onClick={handleSubmit}
              customClass={'mt-6'}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}