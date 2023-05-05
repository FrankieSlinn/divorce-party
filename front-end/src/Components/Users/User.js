import { useNavigate } from "react-router-dom";

import React from 'react'


export default function User(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/users/${props.id}`);
      }
  return (
        <div className='hover:cursor-pointer' onClick={handleClick}>
          <h2>{props.name}</h2>
          <h2>{props.username}</h2>
        </div>

  )
}
