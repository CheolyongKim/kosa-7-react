import React from 'react';

const Child = ({name}) => {

    console.log("child component 가 랜더링 되었습니다 ...");

    return (
        <div>
            child 컴포넌트 {name}
        </div>
    );
};

//memo > 값을 기억하고 있다가 ... 변경이 되면 랜더링 ... React.memo 는  props 검사 >> ({name}) > 성능 ...
export default React.memo(Child);
//export default Child;