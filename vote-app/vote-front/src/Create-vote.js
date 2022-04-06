//创建投票界面
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { produce } from "immer"
import { useInput ,useQuery,useBooleanInput, forceLogin} from "./hooks"
import { useMemo, useState } from "react"
import dayjs from "dayjs"
import './create-vote.css'
import { Divider,Button,Input} from 'antd'
import 'antd/dist/antd.css';

//use-immer是对useState的简单包装。不必再调produce，可以对任意数据类型进行修改
//传给setOption的函数就是用于修改的函数§
// import { set } from "immer/dist/internal"
 function CreateVote({ userInfo }){
  var [options,setOptions] = useState(['',''])
  var title = useInput()
  var desc = useInput()
  var deadline  =  useInput(useMemo(()=>dayjs().add(1,'week').format('YYYY-MM-DDTHH:mm'),[]))
  var anonymous = useBooleanInput()
  var navigate = useNavigate()
  var query = useQuery()
  function remove(idx){
    setOptions(
      produce( options,options =>{
        options.splice(idx,1)
      }
    ))
  }

  function setOption(idx,val){
    setOptions(
      produce(options,options =>{
        options[idx] = val
      }
    ))
    // console.log(options)
  }

 async function create(){
    var vote = {
      title:title.value,
      desc:desc.value,
      options:options,
      deadline:deadline.value,
      anonymous:anonymous.checked,
      multiple:query.get('multiple') === '1' ? true : false
    }
    // console.log(vote)
    try{
      var res =  await axios.post('/vote',vote)
      var createdVote = res.data.result//data里有创建好的投票信息
      navigate("/view-vote/"+createdVote.voteId)
    }catch(e){
      throw e
    }
  }


  return(
    // <div id="fa">
    //   <h1 style={{margin:'0 auto'}}>创建投票</h1>
    //   <div className="inputs"><input type="text" placeholder="投票标题" {...title}/></div>
    //   <div className="inputs"><input type="text" placeholder="补充描述(选填)" {...desc}/></div>

    //   {
    //     options.map((option, idx) =>
    //       <div key={idx} className="inputs">
    //         <div>
    //         <input className="option" type="text" placeholder="选项" value={option} onChange={e => setOption(idx, e.target.value)}/>
    //         <button tabIndex="-1" onClick={() => remove(idx)}>×</button>
    //         </div>
    //       </div>
    //     )
    //   }
   
    //     <div className='bottom'>
    //     <div> <button onClick={() => setOptions(options => [...options,''])}>添加选项</button></div>
    //     <div className="any" title="此项选中后一经投票无法修改">匿名投票:<input type="checkbox"  {...anonymous} /></div>
    //     <div className="time"><span>截止日期:</span><input type="datetime-local" {...deadline} /> </div>      
    //     </div>
  
    //   <div className="ensure"><button onClick={create}>创建投票</button></div>
    // </div>

    <div id="crvo">
        <Divider orientation="left">创建投票</Divider>
   
      <div className="tt"><Input type="text" placeholder="投票标题" {...title}/></div>
      <div className="tt"><Input type="text" placeholder="补充描述(选填)" {...desc}/></div>
    <ul>
      {
        options.map((option, idx) =>
          <li key={idx} >
            <div>
            <Input  spellCheck="false" type="text" placeholder="选项" value={option} onChange={e => setOption(idx, e.target.value)}/>
            <button tabIndex="-1" onClick={() => remove(idx)}>删除</button>
            </div>
          </li>
        )
      }   
    </ul>

       <div className='bottom'>
        <div className="any" title="此项选中后一经投票无法修改"> 匿名投票: <input  type="checkbox"  {...anonymous} /></div>
        <div className="add"> <button onClick={() => setOptions(options => [...options,''])}>添加选项</button></div>
        <div className="time"><span>截止日期:</span><input type="datetime-local" {...deadline} /> </div>      
       </div>
  
      <div className="sub"><Button size='large'  onClick={create}>创建投票</Button></div>
    
    </div>
  )
}

export default forceLogin(CreateVote)