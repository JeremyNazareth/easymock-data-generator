"use client"
import { MoveRight, MoveLeft, UserRound, House } from "lucide-react";
import SideBar from "./components/sideBar"
import { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {

  interface File{
    id: string,
    name: string | null,
    parentId: string | null
  }
  const files =[
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
  ]

  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentFile, setCurrentFile] = useState(files[0]);
  const [folderHistory, setFolderHistory] = useState<string[]>([]);
  const [previousFolderHistory, setPreviousFolderHistory] = useState<string[]>([]);
  const [previousHistoryActive, setPreviousHistoryActive] = useState(false);
  const countHistoryRef = useRef(0);
  const countPrevious = useRef(0);
  const routeFile = searchParams.get('file');

  const handleRoute = (fileId:string, saveToHistory:boolean) =>{
    router.push(`?file=${fileId}`);
    const parentId = files.find((file => file.id === fileId))?.parentId; 
    if(saveToHistory){
      //const parentFile = files.find
      setPreviousHistoryActive(false);
      if(fileId != folderHistory[folderHistory.length - 1]){
        setFolderHistory([...folderHistory, parentId || "root"] )
      }
    } else{
      setPreviousHistoryActive(true);
    }
  }

  const handleHistoryFile = () =>{
    handleRoute(folderHistory[countHistoryRef.current], false);
  }

  const handleHistory = ( previous:boolean) =>{
    
    if(previous){
      if(folderHistory)
      countHistoryRef.current -= 1;
      setPreviousHistoryActive(true);
      setPreviousFolderHistory([...previousFolderHistory, routeFile || 'unknown'])
      handleRoute(folderHistory[countHistoryRef.current], false);
    } else{
      countPrevious.current -= 1;
      countHistoryRef.current = folderHistory.length;
      handleRoute(previousFolderHistory[countPrevious.current], false);
    }
  }

  const debuggin = () =>{
    console.log("=========================================")
    console.log("PreviousHistory " + previousFolderHistory + " PrevRef " + countPrevious.current)
    console.log("FolderHistory " + folderHistory + " Ref " + countHistoryRef.current);
    console.log(previousHistoryActive)
  }
  useEffect(() =>{
    countHistoryRef.current = folderHistory.length;
  },[folderHistory])

  useEffect(() =>{
    countPrevious.current = previousFolderHistory.length;
  }, [previousFolderHistory])
  useEffect(() => {
    setCurrentFile(files.find((file => routeFile  === file.id)) || { id:'0',name: 'home',parentId: null })
  }, [searchParams])

  return (
    <>
      <SideBar files={files}></SideBar>
      <div className="flex min-h-screen ml-80 dark:bg-primary">
        <main className="w-full py-2 px-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 max-w-250">
            <div className="label" onClick={() => handleHistory(true)}>
              <MoveLeft />
            </div> 

            <div className="label" onClick={() => handleRoute("0",true)}>
              <House />
            </div>

            <button className="label" onClick={() => handleHistory(false)} disabled={previousHistoryActive}>
              <MoveRight />
            </button>

            <div className="w-full h-8.75">
              <span className="label flex">Hospital/Clientes/<p className="flex gap-1">{currentFile.name}</p></span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="label w-fit"><p className="flex items-center gap-1"><UserRound size={20} />Persona de Clientes</p> </div>
            <div className="label w-fit"><p className="flex items-center gap-1">32 <UserRound size={20} />Personas</p> </div>
          </div>

          <ul className="files-navegator max-w-250 flex flex-col rounded-[7px] overflow-hidden">
            {files.filter(file => file.parentId === routeFile).map(((children, index) => (
                <li key={index} className={` ${ index%2 ?  'bg-content': 'bg-layout'}`}>
                    <p className="flex gap-1.5" onClick={() => handleRoute(children.id,true)}> <UserRound size={20}/> {children.name} id:{children.id}</p>
                </li>
            )))}
          </ul>

          <div className="w-full items-center">
            <p>Folder id:{currentFile.id} folder id:{searchParams.get("file")} </p>
            <div className="flex gap-2">
                {files.map((file => (
                    <p key={file.id} onClick={() => handleRoute(file.id,true)}>{file.name}</p>
                )))}
            </div>
            <button onClick={() => debuggin()}>Debug</button>
          </div>
        </main>
      </div>
    </>
    
  );
}
