import { Outlet } from "react-router-dom"


function RootLayout() {
  return (

     <div>
        <header className="w-screen h-[10vh] bg-blue-900 flex justify-between items-center ">
            <h1 className="font-bold text-xl ml-2">Friends<span className="text-white">Only</span></h1>
            <div className="flex gap-2 mr-2">
            <button className="bg-blue-500 p-1 rounded  hover:bg-blue-300">Register</button>
            <button className="bg-blue-500 p-1 rounded  hover:bg-blue-300">Login</button>
            </div>
        </header>
        <main>
            <Outlet/>
        </main>
     </div>
 
   
  )
}

export default RootLayout