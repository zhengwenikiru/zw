import { NavLink,Link, Outlet, useNavigate } from "react-router-dom";
import './main.css'
import { Avatar, Button} from 'antd'
import { UserOutlined  ,FormOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useEffect } from "react";
import axios from "axios";
export default function Main(){
  var navigate = useNavigate()
  useEffect(()=>{
    var labels = document.querySelectorAll('label')
    labels.forEach(label=>{
      label.addEventListener('click',()=>{
        label.children[0].checked = true   
        label.children[2].click()
      })
    })
  },[])
 async function logout(){
    try{     
      var res =await axios.get('/account/logout')
      navigate('/')
      window.location.reload()
      //使用navigate，页面未能自动跳转。所以强制刷新页面
    }catch(e){
      throw e
    }
  }

  return(
    <div className="shell">
      <header>
        <img style={{width:'60px',height:'60px'}} src="data:image/png;base64,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" />
       <span style={{textAlign:'center',fontSize:'30px'}}> 投票 </span>
       <div className="avatar"><Button type="primary" shape="round" onClick={logout} className='logout'>登出</Button></div>
     
      </header>
      <div className="container">
      <aside>       
      <label htmlFor="option1" > 
        <input type='radio' id='option1' name="option" defaultChecked />
        <FormOutlined/>
        <Link to="/main/create">新建投票</Link>
      </label>
      <label htmlFor="option2">
        <input type='radio' id='option2' name="option"/>
          <Avatar size={18} icon={<UserOutlined />} />
        <Link to="/main/myvotes">我的投票</Link> 
      </label>
      </aside>
      <main>
        <Outlet/> 
      </main>
     </div>
    </div>
  )
}
