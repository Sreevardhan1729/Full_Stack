import { useState } from "react";
const Main = (props)=>{
    return (
        <h2>{props.name}</h2>
    )
}
const CourseList = ({part})=>{
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}
const Course = ({course}) => {
    const initialValue =0
    const totCouses = course.parts.reduce(
        (accumulator,currectValue) => accumulator + currectValue.exercises,
        initialValue,
    );
    return (
        <div>
            <Main name = {course.name}/>
            {course.parts.map((part) => <CourseList key={part.id} part={part}/>)}
            <p><b>Total number of courses {totCouses}</b></p>
        </div>
    )
}
export default Course