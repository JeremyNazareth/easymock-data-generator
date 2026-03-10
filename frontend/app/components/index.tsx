"use client"
import { useEffect, useState } from "react"

export default function Index (){

    const [navegatorRoute, setNavegatorRoute] = useState('home');
    const [currentFile, setCurrentFile] = useState({
        id: '0',
        name: 'home',
        parent: null,
    });
    const [files, setFiles] = useState([
        {
            id: '0',
            name: 'home',
            parent: null
        },
        {
            id: '1',
            name: 'carpeta1',
            parent: 'home',
        },
        {
            id: '2',
            name: 'carpeta2',
            parent: 'carpeta1'
        },
        {
            id: '2',
            name: 'carpeta5',
            parent: 'carpeta1'
        }
    ])

    const handleClick = (file) =>{
        setCurrentFile(file)
        console.log(currentFile.id)
    }

    return(
        <>
            <div className="w-full items-center">
                <p>{currentFile.id}</p>
                <div className="flex gap-2">
                    {files.map((file => (
                        <p key={file.id} onClick={() => handleClick(file)}>{file.name}</p>
                    )))}
                </div>
                
                {files.filter(file => file.parent === currentFile.name).map((children => (<p>{children.name}</p>)))}
            </div>
            
        </>
    )
}