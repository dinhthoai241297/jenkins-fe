import React from 'react'
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Login from '../containers/account/Login'
import NotFound from '../components/common/NotFound'
import Forbidden from '../containers/Forbidden'
import AboutUS from '../containers/about/AboutUS'
import Exams from '../containers/exams/Exams'
import Register from '../containers/account/Register'
import Competences from '../containers/competences/Competences'
import VerifyAccount from '../containers/account/VerifyAccount'
import ForgotPassword from '../containers/account/ForgotPassword'
import MasterLayout from '../components/common/appLayout/MasterLayout'

import PreLogin  from '../containers/prelogin/PreLogin'
import Test  from '../containers/test/Test'

const RootRoute = () => {
    const {
        login,
        forbidden,
        homePage,
        aboutUs,
        aboutUsCategory,
        aboutUsDetail,
        exams,
        register,
        updateProfile,
        competences,
        verifyAccount,
        forgotPassword,
        preLogin,
        test,
    } = sitePathConfig

    return (
        <BrowserRouter>
            <Route
                path="/"
                render={props => (
                    <MasterLayout {...props}>
                        <Switch>
                            <Redirect
                                exact
                                path={homePage.path}
                                to={exams.path}
                            />
                            <PublicRoute
                                exact
                                path={login.path}
                                component={Login}
                            />
                            <PublicRoute
                                exact
                                path={aboutUs.path}
                                component={AboutUS}
                                accessAuth
                            />
                            <PublicRoute
                                exact
                                path={exams.path}
                                component={Exams}
                                accessAuth
                            />
                            <PublicRoute
                                exact
                                path={register.path}
                                component={Register}
                            />
                            <PublicRoute
                                exact
                                path={forgotPassword.path}
                                component={ForgotPassword}
                            />
                            <PublicRoute
                                exact
                                path={verifyAccount.path}
                                component={VerifyAccount}
                            />
                            <PrivateRoute
                                exact
                                path={updateProfile.path}
                                siteProps={{
                                    isEditing: true,
                                }}
                                component={Register}
                            />
                            <PrivateRoute
                                exact
                                path={competences.path}
                                component={Competences}
                            />
                            <PrivateRoute
                                exact
                                path={forbidden.path}
                                component={Forbidden}
                            />
                             <PrivateRoute
                                exact
                                path={preLogin.path}
                                component={PreLogin}
                            />
                             <PrivateRoute
                                exact
                                path={test.path}
                                component={Test}
                            />
                            <PublicRoute component={NotFound} accessAuth />
                        </Switch>
                    </MasterLayout>
                )}
            />
        </BrowserRouter>
    )
}

export default RootRoute
