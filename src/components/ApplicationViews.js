import React from "react"
import { Route } from "react-router-dom"
import { StudentList } from "./students/StudentList"
import { LandingPage } from "./LandingPage"
import { StudentForm } from "./students/StudentForm"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route exact path="/students">
                <StudentList />
            </Route>
            <Route path="/students/create">
                <StudentForm />
            </Route>
        </>
    )
}