import React from 'react';

const Greeting = (props) => {  //props.자원명  //name={username}  uname="world" conut={constData}  실무는 구조분해 할당 
    return (
        <>
            <h3>hello , {props.name}</h3>
            <h3>hello , {props.uname}</h3>
            <h3>hello , {props.conut}</h3>
        </>
    );
};

export default Greeting;