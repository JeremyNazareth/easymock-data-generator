import Image from "next/image";
import { MoveRight, MoveLeft } from "lucide-react";
export default function Home() {
  return (
    <div className="flex min-h-screen ml-80 dark:bg-primary">
      <main className="w-full p-2">
        <div className="flex items-center gap-2 px-1">
          <div className="label">
            <p>
              <MoveLeft />
            </p>
          </div> 
          <div className="label">
            <p>
              <MoveRight />
            </p>
          </div>
          <div className="w-full h-8.75 max-w-250">
            <p className="label">Hospital/Clientes/🙍‍♂️Persona</p>
          </div>
        </div>
  
      </main>
    </div>
  );
}
