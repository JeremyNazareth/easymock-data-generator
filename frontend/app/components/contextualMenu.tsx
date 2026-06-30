'use client'

import { useEffect, useState } from "react"
import { Folder } from "../page"
export default  function contextualMenu({ menuList, selectedObject }: { menuList: object[], selectedObject:Folder }){
    
    return(
        <>       
        {menuList.map((action, index)=> (
            <li key={ index }
            className={`
                ${index === 0 && menuList.length > 1 ? "rounded-t-[7px]":
                index === menuList.length - 1 && menuList.length > 1 ? "rounded-b-[7px]" :
                menuList.length === 1 ? "rounded-[7px]" : ""}`} 
            onClick={() => action.action(true)}>{action.label}</li>
        ))
        }
        <p>{selectedObject?.name}</p>
        </>
    )   
}