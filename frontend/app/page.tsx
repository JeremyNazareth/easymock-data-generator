
import { MoveRight, MoveLeft, UserRound, House } from "lucide-react";
import Index from "./components/index"

export default function Home() {
  return (
    <div className="flex min-h-screen ml-80 dark:bg-primary">
      <main className="w-full py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 max-w-250">
          <div className="label">
            <MoveLeft />
          </div> 
          <div className="label">
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
          <li className="bg-layout">
            <p className="flex gap-1.5"> <UserRound size={20}/> José </p>
          </li>
          <li className="bg-content">
            <p className="flex gap-1.5"> <UserRound size={20}/> María </p>
          </li>
          <li className="bg-layout">
            <p className="flex gap-1.5"> <UserRound size={20}/> José </p>
          </li>
        </ul>
      </main>
      <Index></Index>
    </div>
  );
}
