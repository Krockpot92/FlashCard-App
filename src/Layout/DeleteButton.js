import React, {useEffect, useState} from "react";
import { useHistory} from "react-router-dom";
import {deleteDeck} from "../utils/api/index"


export default function DeleteButton({deckId}){
  
  const history=useHistory()
  function clickHandle() {if (window.confirm("Delete this deck?\n\nYou will not be able to recover it")){
            deleteDeck(deckId)
            window.location.reload()
            history.push('/')
            window.location.reload()          
          }
          else {history.push('/')}
          }
  
  return <button className="btn btn-danger pr-4 pl-4 " onClick={clickHandle}>Delete</button>
}