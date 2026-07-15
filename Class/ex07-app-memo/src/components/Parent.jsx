import React from 'react';
import { useState } from 'react';
import Child from './Child';

const Parent = () => {

    console.log("Parent component 가 랜더링 되었습니다");

    const [count, setCount] = useState(0);
    const [name, setName] = useState("홍길동");

    return (
        <div>
            <h3>Count : {count}</h3>
            <button onClick={() => setCount(count + 1)}>count 증가하기</button>
            <button onClick={() => setName("김유신")}>props 값 변경 전달</button>
            <hr />
            {/* 부모 컴포넌트가 랜더링 ... 자식 컴포넌트 재랜더링 ... 있을까 (자식 전달되는 값이 동일하다면 재상용)  */}
            <Child name={name} />
        </div>
    );
};

export default Parent;