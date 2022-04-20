// 投票查看及交互页面
import { useParams,useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import { forceLogin, useAxios } from './hooks'
import './ViewVote.css'
import _ from 'lodash'
import dayjs from 'dayjs'
import { useImmer } from "use-immer"
import{ Button,Divider,Progress } from 'antd'
import 'antd/dist/antd.css';
import { ArrowLeftOutlined } from "@ant-design/icons"




/**
 * 投票页面的信息是实时更新的
 * 实现这个需求有两种方案：
 * 一是页面加载成功后一直不断的发ajax请求来获取最新的数据，并展示出来
 *  这种做法在投票已经创建出很久以后就不够好了，因为如果创建出很久以后，大概率是不会更新的
 *  发出请求大概率是没有获取到最新信息的
 * 第二种方案为http长连接，也叫comet，即服务器在收到客户端发来的ajax请求后
 *  如果没有数据要回复给客户端，则服务器hold住这个连接，直到超时后响应空内容，或在有数据后立刻响应该请求
 *    微信/钉钉的登陆都是这个方案
 * 第三种：websocket
 *  页面加载成功后向服务器建立一个websocket连接，如果服务器有新的数据，则直接在这个ws连接上响应客户端
 *    而不用客户端主动的一直发请求
 *
 *
 *
 */
function ViewVote({ userInfo }) {
  var { voteId } = useParams()
  var { loading, data, error, update } = useAxios({ url: `/vote/${voteId}` })
  var [userVotes, setUserVotes] = useState() // 从websocket上获取到的实时信息
  var [selectedOptionIds, setSelectedOptionIds] = useImmer([])
  var navigate = useNavigate()
  useEffect(() => {
    // 如果还在加载，或者是超过截止时间，则什么也不做
    if (loading || Date.now() > new Date(data.vote.deadline).getTime()) {
      return
    }
    var wsUrl = `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/realtime-voteinfo/${voteId}`
    var ws = new WebSocket(wsUrl)
    // 实时接受服务器发来的最新消息
    ws.onmessage = function (e) {
      var data = JSON.parse(e.data)
      // console.log(data)
      setUserVotes(data)
    }
    return () => ws.close()
  //组件销毁时关闭ws连接
  }, [loading, voteId])

  // 为某个选项投票/或取消投票
  async function voteOption(option) {
    if (!data.vote.anonymous) {
      var { optionId } = option
      await axios.post(`/vote/${voteId}`, {
        optionIds: [optionId]
      })
    } else { // 匿名的话，发选中的
      await axios.post(`/vote/${voteId}`, {
        optionIds: selectedOptionIds
      })
      setSelectedOptionIds([])
    }
  }

  function selectOption(option) {
    var { optionId } = option
    if (selectedOptionIds.includes(optionId)) {
      setSelectedOptionIds(selectedOptionIds => {
        var idx = selectedOptionIds.indexOf(optionId)
        selectedOptionIds.splice(idx, 1)
      })
    } else {
      setSelectedOptionIds(selectedOptionIds => {
        selectedOptionIds.push(optionId)
      })
    }
  }

  function handleOptionClick(option) {
    if (data.vote.anonymous) {
      if (votes.some(it => it.userId === userInfo.data.userId)) {
        return
      }//匿名则是选中选项
      selectOption(option)
    } else {//公开
      voteOption(option)
    }
  }

  var votes = userVotes ?? data?.userVotes ?? []
//从当前用户的
  var groupedVotes    = useMemo(() => _.groupBy(votes, 'optionId'), [votes])//用投票选项ID分组,
  //{optionId:[]}
  var uniqueUserCount = useMemo(() => _.uniqBy(votes, 'userId').length, [votes]) // 去掉同用户投票后的数量,即选项有多少人投了


  if (loading) return 'Loading...'

  return (
    <div className="vv">
            <Button style={{float:'left'}} type="primary" shape="round" icon={<ArrowLeftOutlined/>} onClick={()=>navigate(-1)} />
         <Divider orientation="left"><h2>投票标题:{data.vote.title}</h2></Divider>
      <span style={{color: '#3269da'}}>[{data.vote.multiple ? '多选' : '单选'}](多投只取第一个)</span>
      <span style={{color: '#3269da'}}>[{data.vote.anonymous ? '匿名' : '公开'}]</span>
      <div className="voteinfo">
    
      <h3>描述:{data.vote.desc}</h3>
      <ol>
        {
          data.options.map(option => {
           //option是每个选项
            var thisOptionVotes = groupedVotes[option.optionId] || []

            return (
              <li onClick={() => handleOptionClick(option)} key={option.optionId}>
                {option.content}
                (票数:{thisOptionVotes.length})
                {thisOptionVotes.some(it => it.userId == userInfo.data.userId) ? '✔️' : ''}
                <div style={{width:'170px'}}>
                <Progress size="small" percent={uniqueUserCount == 0 ? 0 : (thisOptionVotes.length / uniqueUserCount * 100).toFixed(2)}/>
                </div>
                {/* [{uniqueUserCount == 0 ? 0 : (thisOptionVotes.length / uniqueUserCount * 100).toFixed(2)}%] */}

                {/* 当选选项的任意一票是当前登陆用户，则说明当前用户已经选择该选项 */}

                {selectedOptionIds.includes(option.optionId) ? '✔️' : ''}

                <div/>
                {
                  thisOptionVotes.map(oneVote => {
                    return <span key={oneVote.userId} className="user-id">{oneVote.userId}</span>
                  })
                }
              </li>
            )
          })
        }
      </ol>

      {/* 匿名且当前用户没投过才显示确定投票按钮 */}
      {!!data.vote.anonymous && !votes.some(it => it.userId == userInfo.data.userId) &&
        <Button disabled={!selectedOptionIds.length} onClick={voteOption}>确定投票</Button>
      }

      <p>投票截止日期:{dayjs(data.vote.deadline).format('YYYY-MM-DD HH:mm')}</p>
      </div>
     
    </div>
  )
}

export default forceLogin(ViewVote)
