import React from "react"
import { Route } from "react-router-dom"
import { StudentList } from "./students/StudentList"
import { LandingPage } from "./LandingPage"
import { StudentForm } from "./students/StudentForm"
import { EditStudentForm } from "./students/EditStudentForm"



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
            <Route path="/students/:studentId(\d+)">  
                <EditStudentForm />
            </Route>
        </>
    )
}


//note:  this route will make hyperlink lead to empty student form with url changed to student id at end   <Route path="/students/:studentId(\d+)">  
                   // <StudentForm />
                 // </Route>