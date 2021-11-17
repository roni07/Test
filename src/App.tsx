import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';

const HomePage = lazy(() => import("./Home"));
const ExamPage = lazy(() => import("./Exam"));

const App = () => {

    return (
        <>
            <Suspense fallback={<p>Loading........</p>}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route exact path={"/exam"} component={ExamPage}/>
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </>
    );
}

export default App;
