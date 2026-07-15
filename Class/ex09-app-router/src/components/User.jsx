import React from 'react';
import { useParams } from 'react-router-dom';


/*
동적 라우팅
MPA : localhost:8080/user/1   > spring boot > @pathVariable()  > 조회
SPA : localhost:3000/user/1   > react > useParams() 
링크
<Link to={`/user/1`}>{user.name}</Link>
*/
const User = () => {

    const {userId} = useParams();

    const users = {
        1:{id:1 , name:"김씨" , email:"kim@naver.com"},
        2:{id:2 , name:"이씨" , email:"lee@naver.com"},
        3:{id:3 , name:"박씨" , email:"park@naver.com"}
    }

    const user = users[userId];  // users[0] 또는 users[1]
    console.log(user);

    return (
        <div>
            <h3>user details</h3>
            {
                user ? (
                        <div>
                            <h3>{user.name}</h3>
                            <h3>ID:{user.id}</h3>
                            <h3>EMAIL{user.email}</h3>    
                        </div>
                ) : (
                       <p>User Not found</p> 
                )
            }
        </div>
    );
};

export default User;