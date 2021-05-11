import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { Route } from 'react-router'

const PrivateRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component, {onRedirecting: () => <div>Loading ...</div>
        })}
        {...args}
    />
)


export default PrivateRoute