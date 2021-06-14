import React from 'react'
import ExamsPage from '../../components/exams/ExamsPage'
import { useHistory } from 'react-router'
import sitePathConfig from '../../constants/sitePathConfig';

const Exams = () => {
    const history = useHistory()
    return <ExamsPage renderRouting={()=>history.push(sitePathConfig.preLogin.path)}/>
}

export default Exams
