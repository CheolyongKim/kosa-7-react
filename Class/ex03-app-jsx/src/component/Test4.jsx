import React from 'react';

const Test4 = () => {

    const handleClick = () =>{
        alert("클릭");
    }

    return (
        <div>
            <button onClick={handleClick}>클릭하세요</button>
        </div>
    );
};

export default Test4;