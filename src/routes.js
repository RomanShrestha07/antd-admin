import {lazy, Suspense, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {DASHBOARD, ABOUT, LOGIN, USERS, USER_DETAILS, PRODUCTS} from "./settings/constants";
import Spinner from "./components/Spinner/Spinner";
import AdminLayout from "./layouts/AdminLayout";
import AuthProvider, {AuthContext} from "./context/auth";

const Login = lazy(() => import('./components/Login/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const About = lazy(() => import('./components/About/About'));
const Products = lazy(() => import('./components/Products/Products'));
const Users = lazy(() => import('./components/Users/Users'));

const PrivateRoute = ({children, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
};

const Routes = () => {
    return (
        <Router>
            <AuthProvider>
                <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <PrivateRoute exact path={DASHBOARD}>
                            <AdminLayout>
                                <Suspense fallback={<Spinner/>}>
                                    <Dashboard/>
                                </Suspense>
                            </AdminLayout>
                        </PrivateRoute>

                        <PrivateRoute exact path={ABOUT}>
                            <AdminLayout>
                                <Suspense fallback={<Spinner/>}>
                                    <About/>
                                </Suspense>
                            </AdminLayout>
                        </PrivateRoute>

                        <PrivateRoute exact path={PRODUCTS}>
                            <AdminLayout>
                                <Suspense fallback={<Spinner/>}>
                                    <Products/>
                                </Suspense>
                            </AdminLayout>
                        </PrivateRoute>

                        <PrivateRoute exact path={USERS}>
                            <AdminLayout>
                                <Suspense fallback={<Spinner/>}>
                                    <Users/>
                                </Suspense>
                            </AdminLayout>
                        </PrivateRoute>

                        <Route path={LOGIN}>
                            <Suspense fallback={<Spinner/>}>
                                <Login/>
                            </Suspense>
                        </Route>
                    </Switch>
                </Suspense>
            </AuthProvider>
        </Router>
    );
};

export default Routes;