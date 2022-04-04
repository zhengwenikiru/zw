import { createContext } from "react";
import { useAxios } from "./hooks";

export var UserContext = createContext()
//其他组件能通过该context拿到数据
export default function CurrentUserInfo( {children} ){
  var userInfo = useAxios({ url: '/account/current-user' })

  return(
    <UserContext.Provider value={ userInfo }>
      { children }
    </UserContext.Provider>
  )

}

//该组件为下层组件提供用户信息