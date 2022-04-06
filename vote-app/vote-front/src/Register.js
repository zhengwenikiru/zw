//注册新用户
import axios from 'axios'
import {  useInput } from './hooks'


export default function Register(){
// var name =useInput()
// var secret= useInput()
// var email = useInput()

// function Register(){
//   var newUser = {
//     name:name.value,
//     secret:secret.value,
//     email:email.value
//   }
//   console.log('new user',newUser)
//   try{
//     var res = await axios.post('/account/register',newUser)
//   }catch(e){

//   }
// }

  // return(
  //   <div>
  //   <div>账户名:</div>
  //   <input type="text" placeholder='账户名应只包含数字、字母和下划线' {...name} />
  //   <div>密码:</div>
  //   <input type="password" placeholder='请输入密码' {...secret}/>
  //   <div>邮箱:</div>
  //   <input type="text" placeholder='' {...email} />
  //   <div><button onClick={Register}>注册</button></div>
  //   </div>
  // )

  return (
    <div>
      <div>用户名：</div>
      <input type="text" />
      <div>密码：</div>
      <input type="password" />
      <div>Email</div>
      <input type="text" />

      <div><button>注册</button></div>
    </div>
  )
}