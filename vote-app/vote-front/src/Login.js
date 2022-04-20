import{Link, useNavigate}from 'react-router-dom'
import axios from'axios'
import { useInput, useUser } from "./hooks"
import { useEffect } from 'react'
import './login.css'
import {Button,Input} from 'antd'
import 'antd/dist/antd.css';



export default function Login(){
var name = useInput()
var password = useInput()
var navigate = useNavigate()
var userInfo = useUser()

useEffect(()=>{
  if(userInfo.data){
    navigate('/main')
  }
})//登陆成功了的话，不必进入该页面。回退

async function login(){
var info = {
  name:name.value,
  password:password.value 
}
try{
  //使用axios发请求
    var res= await axios.post('/account/login',info)//axios返回的是相应对象
    userInfo.update()
    navigate(-1)
}catch(e){
  let data = res.data
//请求成功，但是响应码大于等于400在axios里也算失败，网络原因直接请求失败，也会抛错
alert(data.msg)
}
}


  return(
    <div className='login-box'>

      <div className='box1'>
      <div><Input placeholder='用户名' type="text" {...name}/></div>
      <div><Input placeholder='密码' type="password" {...password}/></div>
      </div>
    <div className='box2'><Button type='primiry' shape='round' onClick={login}>登陆</Button> <Link to='/register'>注册</Link></div>
    </div>
  )
}