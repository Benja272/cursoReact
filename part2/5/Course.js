import React from 'react';
const Sum = ({exercises}) => {
  let sum = 0;
  sum = exercises.reduce((s,p) => s+p);
  console.log(sum);
  return(
    <>
      <h3>total of {sum} exercises</h3>
    </>
  )
}

const Part = (props) => {
  let name = props.part.name
  let exercises = props.part.exercises
  return(
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

const Header = ({text}) =>(
  <>
    <h1>{text}</h1>
  </>
)

const Course = ({course}) =>{
  let exercises = course.parts.map(element => element.exercises)
  return(
    <div>
      <Header text={course.name}/>
      {course.parts.map(element => 
          <Part key={element.id} part={element}/>  
      )}
      <Sum exercises={exercises}/>
    </div>
  )
}
export default Course
