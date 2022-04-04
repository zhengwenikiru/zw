import { Link } from "react-router-dom"
import './Create.css'
import { forceLogin } from "./hooks"
import { Button } from 'antd'
function Create(){
  return(
    <div>
       <div className="create">
        <div className="card-single"></div>
        <Button type='primary' shape="round" >
      <Link to="/create-vote">创建单选</Link>
        </Button>
      </div>
      <div className="create">
        <div className="card-dubble"></div>
        <Button shape="round" type="primary" >
      <Link to="/create-vote?multiple=1">创建多选</Link>
        </Button>
      </div>
    </div>
  )
}
export default forceLogin(Create)