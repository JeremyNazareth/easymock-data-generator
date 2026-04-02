"use client"
import { MoveRight, MoveLeft, UserRound, House } from "lucide-react";
import SideBar from "./components/sideBar"
import { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { count } from "console";

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
  const [previousBtnDisabled, setPreviousBtnDisabled] = useState(true);
  const [previousHistoryDisabled, setPreviousHistoryDisabled] = useState(true);
  const countHistoryRef = useRef(0);
  const countPrevious = useRef(0);
  const routeFile = searchParams.get('file');

  const handleRoute = (fileId:string, saveToHistory:boolean) =>{
    router.push(`?file=${fileId}`);
    const parentId = files.find((file => file.id === fileId))?.parentId; 
    if(saveToHistory){
      console.log(countHistoryRef.current + " " + folderHistory.length);
      setPreviousBtnDisabled(false);
      setPreviousHistoryDisabled(true);
      if(fileId != folderHistory[folderHistory.length - 1] && parentId != folderHistory[folderHistory.length - 1]){
        console.log(fileId + " saving " + folderHistory[folderHistory.length - 1])
        setFolderHistory([...folderHistory, parentId || "root"] )
      }
    } else{
      setPreviousHistoryDisabled(false);
      setPreviousBtnDisabled(true);
    }
  }

  const handleHistoryFile = () =>{
    handleRoute(folderHistory[countHistoryRef.current], false);
  }
                                         
  const handleHistory = ( previous:boolean) =>{
    if(previous){
      if(folderHistory)
      countHistoryRef.current -= 1;
      setPreviousHistoryDisabled(false);
      setPreviousFolderHistory([...previousFolderHistory, routeFile || 'unknown'])
      console.log("HandleFunction " + countHistoryRef.current)
      handleRoute(folderHistory[countHistoryRef.current], false);

      if(countHistoryRef.current <= 0 ){
        setPreviousBtnDisabled(true);
        console.log("HandleHistory false")
      } else{
        setPreviousBtnDisabled(false);
      }

    } else{
      countHistoryRef.current += 1;
      handleRoute(folderHistory[countHistoryRef.current], false);
      if(countHistoryRef.current === folderHistory.length -1 ){
        setPreviousHistoryDisabled(true);
        setPreviousBtnDisabled(false);
      } else{
        setPreviousHistoryDisabled(false);
      }
    }
  }

  const debuggin = () =>{
    console.log("=========================================")
    console.log("FolderHistory " + folderHistory + " FolderLenght " + folderHistory.length);
    console.log(previousHistoryDisabled + " Ref " + countHistoryRef.current)
  }

  useEffect(() =>{
    countHistoryRef.current = folderHistory.length;
  },[folderHistory])
  useEffect(() =>{
    countPrevious.current = previousFolderHistory.length;
  },[previousFolderHistory])

  useEffect(() => {
    setCurrentFile(files.find((file => routeFile  === file.id)) || { id:'0',name: 'home',parentId: null })
  }, [searchParams])

  return (
    <>
      <SideBar files={files}></SideBar>
      <div className="flex min-h-screen ml-80 dark:bg-primary">
        <main className="w-full py-2 px-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 max-w-250">
            <button className="label disabled:bg-amber-950" onClick={() => handleHistory(true)} disabled={previousBtnDisabled}>
              <MoveLeft />
            </button> 

            <div className="label" onClick={() => handleRoute("0",true)}>
              <House />
            </div>

            <button className="label disabled:bg-amber-950" onClick={() => handleHistory(false)} disabled={previousHistoryDisabled}>
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

          <div className="w-full items-center flex gap-1">
            {folderHistory.map((folder, index) => (
              <p key={index}>{folder}</p>
            ))}
          </div>
          <p>{countHistoryRef.current}</p>
          <button className="w-fit" onClick={() => debuggin()}>Debug</button>
        </main>
      </div>
    </>
    
  );
}
