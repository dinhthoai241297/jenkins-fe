import React from 'react'
import PreLoginPage from '../../components/prelogin/PreLoginPage'
import { useHistory } from 'react-router'
import sitePathConfig from '../../constants/sitePathConfig';
 
const Test = () => {
    const history = useHistory()
    return <PreLoginPage renderRouting={()=>history.push(sitePathConfig.test.path)}/>
}

export default Test
