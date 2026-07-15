import './App.css'
import Test from './component/Test'
import Test2 from './component/Test2'
import Test3 from './component/Test3'
import Test4 from './component/Test4'
import User from './component/User'


/*
App.jsx 컴포넌트는 부모
Test.jsx , Test2.jsx 자식 컴포넌트

부모 > 자식에 데이터 전달 (props)
전달할 수 있는 자원 : {20+10} , {true} , {객체} , {함수}

isLoggedIn={true}
*/
function App() {
 
    const user = {
      name:'김유신',
      age:20,
      email:'kim@naver.com',
      imgUrl:'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1723697466~exp=1723698066~hmac=cb1308967c2c5686b6bd05ed53f2fe50aa1fcb20554e7f118ed75f53ab5abb03'
    }
 
    const user2 = {
      name:'홍길동',
      age:20,
      email:'kim@naver.com',
      imgUrl:''
    }

   return (
    <div style={{padding:'10px' , fontFamily:'궁서체'}}>
        <Test />
        <Test2 isLoggedIn={true} />
        <Test3 />
        <Test4 />
        <User user={user} />
        <User user={user2} />
    </div>
  )
}

export default App
