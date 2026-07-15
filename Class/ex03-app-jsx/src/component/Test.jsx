import React from 'react';

//{ JSX 문법 javascript 모두 사용가능 }
const Test = () => {

    const name = "김유신";
    const age =25;

    return (
        <div>
            <h3>{name}</h3>
            <p>{age >= 20 ? "성인":"미성년자"}</p>
        </div>
    );
};

export default Test;