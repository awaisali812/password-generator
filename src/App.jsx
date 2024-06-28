import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState('');
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      str +='0123456789'
    };
    if (charAllowed) {
      str +='!@#$%^&*(){}?><|'
    };
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass +=str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])
 
  useEffect(()=>{
    passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])

 const copyPassword=useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
 },[password])
  return (
    <>
    <div className='w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-400 bg-gray-200'>
    <p className='text-4xl mb-4'>Password Generator</p>
    <div className='flex rounded-lg  ovrflow-hidden'>
      <input type="text" 
      value={password} 
      placeholder='password' 
      readOnly 
      className='mb-3 outline-none w-full py-1 px-3 rounded-lg'
       ref={passwordRef}
       />
       <button
       onClick={copyPassword}
       className=' mb-3 outline-none shrink-0 rounded-lg px-3 py-0.5 bg-blue-700 text-white'>Copy</button>
    </div>
    <div className='flex text-sm mb-3 gap-x-2'>
      <div className='gap-x-1 text-center flex '>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        onChange={(e)=>{setLength(e.target.value)}}
        className='cursor-pointer'
         />
         <label >Length : {length}</label>
      </div>
      <div className='flex gap-x-2'>
        <input type="checkbox" 
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=> !prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex gap-x-2'>
        <input type="checkbox" 
        defaultChecked={charAllowed}
        id='charInput'
        onChange={()=>{
          setCharAllowed((prev)=> !prev);
        }}
        />
        <label htmlFor="charInput">Chars</label>
      </div>
    </div>
    </div>
      
    </>
  )
}

export default App
