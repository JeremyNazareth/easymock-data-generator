'use client'
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import  handleRoute  from "../page"


interface fileProps{
    id: string,
    name: string,
    parentId: string
}

interface SideBarProps {
    files: fileProps[];  // Array de strings
}


export default function SideBar( {files}: SideBarProps) {
    const router = useRouter();
    return(
        <div className="w-xs h-screen fixed p-10 bg-layout">
          <main>
            <h1 className="text-center decoration-none">Easy Mock</h1>
            <div>
              <h1 className="text-center bg-primary mt-20 p-1 rounded-t-[7px]">Jeremy</h1>
              <ul className="folder-navegator bg-content rounded-b-[7px] pl-6 py-4 flex flex-col gap-2">
                {files.map(((file, index )=> (
                    <li onClick={() => router.push(`?file=${file.id}`)} key={index}><Folder size={22}  />{file.name}</li>
                )))}
              </ul>
            </div>
          </main>
        </div>
    )
}