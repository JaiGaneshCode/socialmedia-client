import { LOGIN_USER } from '../utils/graphql';
import React, { useState, useContext } from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Button, Form} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useNotificationDispatch } from '../context/notification';
import { useForm } from '../utils/hooks';

function Login(props) {

    const context = useContext(AuthContext);

    const dispatch = useNotificationDispatch();

    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser, {loading}] = useMutation(LOGIN_USER,{
        update(_, { data: {login: userData } }){
            context.login(userData);
            dispatch({type: "ADD_USERDETAILS", payload: userData })
            props.history.push("/");
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser();
    }

    return (
        <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1> Login Page</h1>
            <Form.Input
                type="email"
                label="Email Address"
                placeholder="Email Address"
                name="email"
                value={values.email}
                error= { errors.email ? true : false }
                onChange={onChange}
                />
            <Form.Input
                type="password"
                label="Password"
                placeholder="Password"
                name="password"
                value={values.password}
                error= { errors.password ? true : false }
                onChange={onChange}
                />
            <Button type="submit" primary>
                Login
            </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
            <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    )
}

export default Login;