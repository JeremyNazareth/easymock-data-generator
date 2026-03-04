import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen ml-80 dark:bg-primary">
      <main className="w-full p-2">
        <div className="flex items-center gap-2 px-1">
          <div className="label">
            <p>
              ⬅️
            </p>
          </div> 
          <div className="label">
            <p>
              ➡️
            </p>
          </div>
          <div className="w-full h-8.75">
            <p className="label">Hospital/Clientes/🙍‍♂️Persona</p>
          </div>
        </div>
  
      </main>
    </div>
  );
}
