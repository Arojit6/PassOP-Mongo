

const Navbar = () => {
  return (
   <nav  className='bg-slate-800  '>
    <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

      <div className='logo  font-bold text-2xl'>
        <span className="text-green-700">&lt;</span>
        <span className="text-emerald-100">Pass</span>
         
        <span className="text-green-700">OP</span>
        <span className= "text-green-800">/&gt;</span>
        
        </div>
        
        <button className="text-black   rounded-full bg-green-500 my-5 items-center justify-between flex gap-2 ring-white ring-1 px-3 py-1" >
            <img  className=" w-8 h-8  " src="icons/git.webp" alt="github" />
            
            <span className="font-bold  px-1">GitHub</span>
          </button> 
    </div>
  </nav>
  )
}

export default Navbar
