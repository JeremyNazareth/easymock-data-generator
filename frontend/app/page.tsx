"use client"
import { MoveRight, MoveLeft, UserRound, House, FolderPlus, FilePlusCorner, X, Folder, File } from "lucide-react";
import SideBar from "./components/sideBar"
import ContextualMenu from "./components/contextualMenu";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Person, FakerPerson } from './interfaces/index'
import  MockLayout  from './components/mockLayout'
import { initialize } from "next/dist/server/lib/render-server";
import { mock } from "node:test";

export interface Folder{
  id: string | null,
  name: string | null,
  parentId: string | null
}

export interface Mock{
  id: string,
  name: string,
  parentId: string
}

export interface Files{
  folders: Folder[],
  mocks: Mock[]
}

export default function Home() {

  const testFolders = [
    { id: '0', name: 'root', parentId: null},
    { id: '1',name: 'carpeta1', parentId: '0'},
    { id: '2',name: 'carpeta2', parentId: '1'},
    { id: '3', name: 'carpeta5', parentId: '1'},
    { id: '4', name: 'carpeta99', parentId: '3'}
  ]

  const testMocks = [
    {id: "0", name: "mock1",parentId:"1"},
    {id: "1", name: "mock2",parentId:"1"},
    {id: "2", name: "mock3",parentId:"0"},
    {id: "3", name: "mock4",parentId:"3"},
    {id: "4", name: "mock1",parentId:"0"},
  ]

  const files = useRef<Files>({ folders:[], mocks:[]})
  const [currentFiles, setCurrentFiles] = useState<Files>({folders:[],mocks:[]});
   
  const [mockDataList, setMockDataList] = useState<FakerPerson[]>([]);

  const filterFilesRef = useRef<Files>({folders:[],mocks:[]})
  const [filterFolder, setFilterFolder] = useState<Folder[]>([]);
  const [filterMocks, setFilterMocks] = useState<Mock[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const routeFileId = searchParams.get('file');
  const routeFileRef = useRef<Folder>({ id:'0', name: 'root', parentId: null})
  const [currentFile, setCurrentFile] = useState(routeFileRef.current || { id:'0', name: 'default', parentId: null})

  //History buttons
  const [folderHistory, setFolderHistory] = useState<string[]>([]);
  const [previousBtnDisabled, setPreviousBtnDisabled] = useState(true);
  const [previousHistoryBtnDisabled, setPreviousHistoryBtnDisabled] = useState(true);
  //Contextual Menu
  const [contextMenu, setContextMenu] = useState({visible: false, posX:0, posY:0})
  const [menuLabels, setMenuLabels] = useState<{label: string, action: Function | null}[]>([]);
  const selectedObjectRef = useRef<Folder>({id:null,name:null,parentId:null});
  
  let countRef = useRef<null | number>(null);

  const handleRoute = (nextId:string, saveId:string | null) =>{
    if(saveId && saveId != folderHistory[folderHistory.length - 1]){
      setFolderHistory([...folderHistory, saveId || "root"])
      countRef.current = folderHistory.length + 1;
    }

    router.push(`?file=${nextId}`);
    if(countRef.current != 0){
      setPreviousBtnDisabled(false)
    }
  }
  
  const settingLayoutValues = ( values ) =>{
    setCurrentLayout(values)
  }
 
  const settingMocksList = ( mockList ) =>{
    console.log(currentFiles)
    setCurrentFiles({folders:[...currentFiles.folders], mocks:[...currentFiles.mocks,...mockList]})
    setMockDataList([...mockDataList, ...mockList])
  }

  const saving = (storage:string, data:any) =>{
    window.localStorage.setItem(`${storage}`,JSON.stringify(data))
  }

  const savingFiles = (folders:Folder[], mocks) =>{
    
    let storedFilesData = window.localStorage.getItem('files')
    let storedFiles = storedFilesData ? JSON.parse(storedFilesData) as Files : {folders:[],mocks:[]}
    if(storedFiles){
      folders = folders.filter(folder => !storedFiles.folders.some(storedFolder => storedFolder.id === folder.id))
      mocks = mocks.filter(mock => !storedFiles.mocks.some(storedMock => storedMock.id === mock.id))
      storedFiles = {folders:[...storedFiles?.folders, ...folders], mocks:[...storedFiles?.mocks, ...mocks]}
      window.localStorage.setItem('files',JSON.stringify(storedFiles))
      setCurrentFiles(storedFiles)
    }
  }

  useEffect(() =>{
    routeFileRef.current = files.current.folders.find(file => file.id === routeFileId) || { id:'0', name: '?', parentId: null}
    filterFilesRef.current.folders = files.current.folders.filter(folder => folder.parentId === routeFileId)
    filterFilesRef.current.mocks = files.current.mocks.filter(mock => mock.parentId === routeFileId)

    setFilterFolder(currentFiles.folders)
    setFilterMocks(currentFiles.mocks)
  },[currentFiles])

  const handleInitialize = () =>{

    const initializeFiles = {
      folders: testFolders,
      mocks: testMocks
    } as Files

    savingFiles(initializeFiles.folders,initializeFiles.mocks)

    localStorage.setItem('mocksId', JSON.stringify(testMocks.length - 1))
    const storedFiles = localStorage.getItem('files')
    if(storedFiles)
    files.current = JSON.parse(storedFiles);
    handleRoute("0",null);
  }

  useEffect(() =>{
    console.log(routeFileId)
    routeFileRef.current = files.current.folders.find(file => file.id === routeFileId) || { id:'0', name: '?', parentId: null}

    filterFilesRef.current.folders = files.current.folders.filter(folder => folder.parentId === routeFileId)
    filterFilesRef.current.mocks = files.current.mocks.filter(mock => mock.parentId === routeFileId)
    
    setFilterFolder(filterFilesRef.current.folders)
    setFilterMocks(filterFilesRef.current.mocks)
    setCurrentFile(routeFileRef.current)
    setEditFGUI(false);
  },[searchParams])

  //GUI
  const [createFGUI, setCreateFGUI] = useState(false);
  const [editFGUI, setEditFGUI] = useState(false);
  const [createFileGUI, setCreateFileGUI] = useState(false);

  const [currentLayout, setCurrentLayout] = useState<any>([]);

  const createFolder = () =>{
    const folderName = document.getElementById('folderName') as HTMLInputElement;
    if(folderName){
      const newFolder = 
      {
        id: files.current.folders.length.toString(),
        name: folderName.value,
        parentId: routeFileId
      }
    
      files.current.folders = [...files.current.folders, newFolder]
      folderName.value = "";
    }
  }
  
  const editEnter = ( e ) =>{
    const folderEditInput = document.getElementById('folderEditInput') as HTMLInputElement;
    if(e.key === 'Enter')
    {
      const selectedFolder = files.current.folders.findIndex(folder => folder.id === selectedObjectRef.current.id)
      files.current.folders[selectedFolder] = {...files.current.folders[selectedFolder], name:folderEditInput.value}
      filterFilesRef.current.folders = files.current.folders.filter(folder => folder.parentId === routeFileId)
      setFilterFolder(filterFilesRef.current.folders)
      setEditFGUI(false);
    }
  }

  const deleteFolder = () =>{
    console.log("-")
    console.log(files.current, selectedObjectRef.current.id)
    //setFiles(files.filter(folder => folder.id !== selectedObjectRef.current.id))
    console.log(files.current)
  }

  const generalList = [
    { label: "Crear carpeta", action:setCreateFGUI },
    { label: "Crear archivo", action:setCreateFileGUI }
  ]

  const folderMenuList =[
    { label: "Editar carpeta", action:setEditFGUI },
    { label: "Eliminar carpeta", action:deleteFolder}
  ]
  
  const mockMenuList =[
    { label: "Editar Mock", action:null},
    { label: "Eliminar Mock", action:null }
  ]
                                         
  const handleHistory = ( previous:boolean) =>{
    if(folderHistory && countRef.current != null)
    {
      if(previous){
        if(countRef.current === folderHistory.length  && routeFileId != folderHistory[folderHistory.length - 1]){
          setFolderHistory([...folderHistory, routeFileId || "root"])
        }
        countRef.current -= 1;
        handleRoute( folderHistory[countRef.current] || 'unkown', null);

      } else{
        countRef.current += 1;
        handleRoute( folderHistory[countRef.current] || 'unkown', null);
      } 
    } 
  }

  useEffect(() =>{  
    if(folderHistory.length != 0 && countRef.current != 0){
      setPreviousBtnDisabled(false)
    } else{
      setPreviousBtnDisabled(true)
    }

    if(folderHistory.length === 0 || (countRef.current === folderHistory.length - 1 || countRef.current === folderHistory.length)){
      setPreviousHistoryBtnDisabled(true);
    } else{
      setPreviousHistoryBtnDisabled(false);
    }

  })

  const debuggin = () =>{
    console.log("=========================================")
    console.log(filterFilesRef.current)
    console.log(currentFile)
    console.log(routeFileId)
  }

  const handleContextMenu = (e, labelList, selectedObject) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ visible: true, posX: e.clientX, posY: e.clientY });
    setMenuLabels(labelList);
    selectedObjectRef.current = selectedObject
  };

  const handleClick = () => {
    setContextMenu({ visible: false, posX: 0, posY: 0 });
  };

  useEffect(() =>{
    handleInitialize()
    window.addEventListener('click', handleClick)
    setEditFGUI(false);
  },[])


  return (
    <div>
      {/*Interfaces*/}
      <ul className={`interactive-list bg-layout [&>li]:py-2 [&>li]:px-8 [&>li]:interactive rounded-[7px] z-1 ${contextMenu.visible ? "fixed" : "hidden"} z-50`}
      style={{top: contextMenu.posY, left: contextMenu.posX}}>
        <ContextualMenu menuList={menuLabels} selectedObject={selectedObjectRef.current}></ContextualMenu>
      </ul>

      <MockLayout settingMocksList={settingMocksList}></MockLayout>
      <div className={`fixed label top-50 left-100 z-1 px-2
        transition-all duration-150 ease-in-out ${createFGUI ? "opacity-100" : "opacity-0 hidden"}`}>
        <div className="flex justify-between items-center mx-1 mb-1">
          <p className="py-1">Crear Carpeta</p>
          <X className="bg-red-400 rounded-[7px]" onClick={() => setCreateFGUI(false)} />
        </div>
        
        <input type="text" id="folderName" className="bg-primary rounded-[7px] px-2 py-1 block" placeholder="Nombre de la carpeta" name="folderName" />
        <button className="text-center interactive bg-green-700 rounded-[7px] w-full mt-3" onClick={() => createFolder()}>Crear</button>
      </div>
      <div>

      </div>
      <SideBar files={currentFiles.folders}></SideBar>
      <div className="flex min-h-screen ml-80 dark:bg-primary">
        <main className="max-w-250 w-full py-2 px-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 max-w-250">
            <button className="label interactive disabled:bg-amber-950" onClick={() => handleHistory(true)} disabled={previousBtnDisabled}>
              <MoveLeft />
            </button> 

            <div className="label interactive" onClick={() => handleRoute("0",routeFileId)}>
              <House />
            </div>

            <button className="label interactive disabled:bg-amber-950" onClick={() => handleHistory(false)} disabled={previousHistoryBtnDisabled}>
              <MoveRight />
            </button>

            <div className="w-full h-8.75">
              <span className="label flex interactive">Hospital/Clientes/<p className="flex gap-1">{currentFile.name}</p></span>
            </div>

            <button className="label interactive" onClick={() => setCreateFGUI(true)}>
              <FolderPlus />
            </button>

            <button className="label">
              <FilePlusCorner />
            </button>
          </div>

          <div className="flex gap-2">
            <div className="label w-fit"><p className="flex items-center gap-1"><UserRound size={20} />Persona de Clientes</p> </div>
            <div className="label w-fit"><p className="flex items-center gap-1">32 <UserRound size={20} />Personas</p> </div>
          </div>

          <ul className="files-navegator max-w-250 flex flex-col overflow-hidden bg-layout min-h-[500px] rounded-[7px]" onContextMenu={(e) => handleContextMenu(e,generalList,null)}>
            {filterFolder.map(((folderChild, index) => (
              <li key={index} onClick={() => {handleRoute(folderChild.id, currentFile.id)}}  onContextMenu={ (e) => handleContextMenu(e, folderMenuList, folderChild)}
              className={` 
                ${ index%2 ?  'bg-content': 'bg-layout'}
                ${ filterFolder.length === 1 ? "rounded-[7px] " : ""}
                ${ filterFolder.length > 1 && index === 0 ? "rounded-t-[7px]" : ""}
                ${ filterFolder.length > 1 && index === filterFolder.length - 1 ? "rounded-b-[7px]" : ""}
              border-2 border-transparent
              hover:border-2 hover:border-cyan-500`}>
                {editFGUI && folderChild.id === selectedObjectRef.current.id ? 
                ( 
                  <input id="folderEditInput" onBlur={() => setEditFGUI(false)} autoFocus type="text" onClick={(e) => e.stopPropagation()}  onKeyDown={( e ) => editEnter(e)} />                    
                ): 
                ( 
                  <p className="flex gap-1.5"> <Folder size={20}/> {folderChild.name} id:{folderChild.id}</p>
                )}
              </li>
            )))}
            {
              filterMocks.map((mock, index) => (
                <li className="flex gap-1.5" key={index} onContextMenu={(e) => handleContextMenu(e, mockMenuList, mock)}> <File size={20}/> {mock.id} {mock.fullName}{mock.parentId}</li>
              ))
            }
          </ul> 
          
          <button className="w-fit" onClick={() => debuggin()}>Debug</button>
          <button className="w-fit" onClick={() => window.localStorage.removeItem('files')}>clear storage</button>
          <button onClick={() => mockData()}> MockData</button>
          <ul>Mock Data list</ul>
          {mockDataList.map( mockData => (
            <li key={mockData.id}>
              <p>{mockData.id} {mockData.fullName}{mockData.parentId}</p>
            </li>
            
          ))}
        </main>
      </div>
    </div>
    
  );
}
