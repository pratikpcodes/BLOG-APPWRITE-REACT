import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protect({children, authbyuser= true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const storeAuthStat = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authbyuser && storeAuthStat !== authbyuser){
            navigate("/login")
        } else if(!authbyuser && storeAuthStat !== authbyuser){
            navigate("/")
        }
        setLoader(false)
    }, [storeAuthStat, navigate, authbyuser])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
