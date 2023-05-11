import { useNavigate } from "react-router-dom";

import React from 'react'
import { getToAccountPage } from "./api";


export default function User(props) {
    const navigate = useNavigate();


  async function handleClick() {
    console.log('clicked!')
    if (props.tokenInLocalStorage) {
      console.log('there is a token!')

        let token = JSON.parse(localStorage.getItem('divorceJWT')) 
        if (token.id === props.id) {
          console.log('MATCH!!')
          let response = await getToAccountPage(token.id, token)           
        if (response.status === 200) {
          console.log('response generated')
          navigate(`/users/${token.id}/account`)    
        } 
        } else {
          console.log('NO MATCH')
          navigate(`/users/${props.id}`);
        }
     
      } else {
        console.log('still not account')
        navigate(`/users/${props.id}`)
      }    
  }

  return (
        <div className='hover:cursor-pointer' onClick={handleClick}>
          <h2>{props.name}</h2>
        </div>

  )
}
