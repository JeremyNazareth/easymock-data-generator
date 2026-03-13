"use client"
import { MoveRight, MoveLeft, UserRound, House } from "lucide-react";
import Index from "./components/sideBar"
import { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  //const [navegatorRoute, setNavegatorRoute] = useState('home');
  const [routeFile, setRouteFile] = useState('0');
  const [files, setFiles] = useState([
    {
      id:'0',
      name: 'home',
      parentId: null
    },
    {
      id: '1',
      name: 'carpeta1',
      parentId: '0',
    },
    {
      id: '2',
      name: 'carpeta2',
      parentId: '1'
    },
    {
      id: '3',
      name: 'carpeta5',
      parentId: '1'
    },
    {
      id: '4',
      name: 'carpeta99',
      parentId: '3'
    }
  ])
  const [currentFile, setCurrentFile] = useState(files[0]);

  const handleRoute = (fileId) =>{
    router.push(`?file=${fileId}`)
  }
  useEffect(() => {
    setRouteFile(searchParams.get('file')|| '0')
    setCurrentFile(files.find((file => routeFile  === file.id)) || { id:'0',name: 'home',parentId: null })
  }, [searchParams])
  
  return (
    <div className="flex min-h-screen ml-80 dark:bg-primary">
      <main className="w-full py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 max-w-250">
          <div className="label">
            <MoveLeft />
          </div> 

          <div className="label" onClick={() => handleRoute("0")}>
            <House />
          </div>

          <div className="label">
            <MoveRight />
          </div> 
          <div className="w-full h-8.75">
            <span className="label flex">Hospital/Clientes/<p className="flex gap-1"><UserRound size={18} />Persona</p></span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="label w-fit"><p className="flex items-center gap-1"><UserRound size={20} />Persona de Clientes</p> </div>
          <div className="label w-fit"><p className="flex items-center gap-1">32 <UserRound size={20} />Personas</p> </div>
        </div>

        <ul className="files-navegator max-w-250 flex flex-col rounded-[7px] overflow-hidden">
          {files.filter(file => file.parentId === currentFile.id).map(((children, index) => (
              <li key={index} className={` ${ index%2 ?  'bg-content': 'bg-layout'}`}>
                  <p className="flex gap-1.5" onClick={() => handleRoute(children.id)}> <UserRound size={20}/> {children.name} </p>
              </li>
          )))}
        </ul>

        <div className="w-full items-center">
          <p>{currentFile.id}</p>
          <div className="flex gap-2">
              {files.map((file => (
                  <p key={file.id} onClick={() => handleRoute(file.id)}>{file.name}</p>
              )))}
          </div>
        </div>
      </main>
    </div>
  );
}
