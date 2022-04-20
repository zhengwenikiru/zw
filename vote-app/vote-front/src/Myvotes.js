import { Link } from "react-router-dom"
import { forceLogin,useAxios } from "./hooks"
import { Divider} from 'antd'

function Myvotes({userInfo}){
  var { loading,data,error,update } = useAxios({ url: '/vote' })
  // console.log(loading,data)
//向后端发url为 /vote的get请求获取当前登陆用户的所有投票信息
if(loading) return  null
  return (
    <div>
              <Divider orientation="left">我的投票</Divider>
      <ul>
       {
          data.map(vote =>{
            return (
            <li key = { vote.voteId}>
              <Link to={ '/view-vote/' + vote.voteId}> {vote.title} </Link>
              <span style={{color: '#3269da'}}>({vote.multiple ? '多选' : '单选'})</span>
              <span style={{color: '#3269da'}}>({vote.anonymous ? '匿名' : '公开'})</span>             
            </li>
            )
          })
       }
      </ul>
    </div>
  )
}



export default forceLogin(Myvotes)
//forceLogin会把userInfo传给包裹的组件