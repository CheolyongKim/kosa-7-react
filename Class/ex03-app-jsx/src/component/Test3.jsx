import React from 'react';

const Test3 = () => {

    const fruits = ["사과" , "바나나" , "딸기"];

    return (
        <div>
             <div>
            {
               fruits.map((fruit,index) => (
                <li key={index}>{fruit}</li>
               ))
            }
        </div>
        </div>
    );
};

/*
 fruits.map((fruit,index)=>{
                    <li key={index}>{fruit}</li>
                })
*/
export default Test3;