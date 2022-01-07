import React, {useEffect, useState} from "react";
import { useHistory} from "react-router-dom";
import {deleteCard} from "../../utils/api/index"


export default function DeleteCardButton({cardId}){
  console.log(cardId)
  const history=useHistory()
  function clickHandle() {if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
            deleteCard(cardId)
            window.location.reload()
            history.push('/')
            window.location.reload()          
          }
          else {history.push('/')}
          }
  
  return <button className="btn btn-danger pr-4 pl-4" onClick={clickHandle} type="button">Delete</button>
}