import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { Route, Redirect } from 'react-router'
import Loading from '../Loading/Loading'
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";


const PrivateRoute = ({ component: Component, ...args }) => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])


    return <Route {...args} render={(props) => (
        !isLoading ?
            isAuthenticated === true
                ? <Component {...props} /> 
                : loginWithRedirect()
            :
            <Loading />
    )} />

    }


export default PrivateRoute
