import React from "react"
import { Route } from "react-router-dom"
import { StudentList } from "../students/StudentList"
import { LandingPage } from "./LandingPage"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route exact path="/students">
                <StudentList />
            </Route>
        </>
    )
}