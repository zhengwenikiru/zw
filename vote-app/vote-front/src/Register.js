//注册新用户
import axios from 'axios'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import {  useInput } from './hooks'
import {Button,Input} from 'antd'
import 'antd/dist/antd.css';


export default function Register(){
var name =useInput()
var password= useInput()
var email = useInput()
var navigate = useNavigate()

async function register(){
  var newUser = {
    name:name.value,
    password:password.value || 0,
    email:email.value
  }
  // console.log('new user',newUser)
  try{
    var res = await axios.post('/account/register',newUser)
    navigate('/login',{replace:true})
  }catch(e){
    let data = res.data
    // console.log(data)
  }
}

  return(
    <div id='reg-box'>
      <div className='box3'>
    <div><Input type="text" placeholder='账户名' {...name} /></div>
    <div><Input type="password" placeholder='请输入密码' {...password}/></div>
    <div><Input type="text" placeholder='请输入邮箱' {...email} /></div>
      </div>
    <div className='box4'><Button type='primary' shape='round' onClick={register}>注册</Button></div>
    </div>
  )

  // return (
  //   <div>
  //     <div>用户名：</div>
  //     <input type="text" />
  //     <div>密码：</div>
  //     <input type="password" />
  //     <div>Email</div>
  //     <input type="text" />

  //     <div><button>注册</button></div>
  //   </div>
  // )
}