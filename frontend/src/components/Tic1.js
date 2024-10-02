import React, { useState } from 'react'

function Tic1({id,prevBlock,setPrevBlock,turn,setTurn,setFinalO,setFinalX,finalO,finalX

}) {

    const [x,setX] = useState([]);
    const [o,setO] = useState([]);
    
    const handleMove = (e)=>{
        let id1 = e.target.id;
        if(x.includes(id1.charAt(1)) || o.includes(id1.charAt(1)))alert("Occupied")
        else if(prevBlock === "" || id == prevBlock){
            document.getElementById(id1).innerHTML = turn;
            
            if(finalO.includes(parseInt(id1.charAt(1))) || 
            finalX.includes(parseInt(id1.charAt(1)))) setPrevBlock("");
            else setPrevBlock(id1.charAt(1))

            if(turn ==="X"){
                win("x",[...x,id1.charAt(1)])
                setX([...x,id1.charAt(1)]);
            }
            else{
                win("o",[...o,id1.charAt(1)]) 
                setO([...o,id1.charAt(1)]);
            }
            
            
            setTurn((prev)=>prev==="X"?"O":"X")
            
        }else{
            alert("Wrong Block!  use "+prevBlock)
        }
        
        
    }

    const win = (t,arr)=>{

        const logic = [["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];
        
        logic.forEach((list)=>{
            if(arr.includes(list[0]) && arr.includes(list[1]) && arr.includes(list[2])){
                
                if(t=="o")setFinalO([...finalO,id]);
                else setFinalX([...finalX,id]);

                if(id === parseInt(arr[arr.length-1]))setPrevBlock("")
                
            }
            
        })
    }

    return (

        <>
        
        <div className=' grid grid-cols-3  sm:text-xl p-4 border-collapse'>
            <div onClick={handleMove} id={id+'1'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10  border-r-2 border-b-2 '></div>
            <div onClick={handleMove} id={id+'2'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 border-x-2 border-b-2 '></div>
            <div onClick={handleMove} id={id+'3'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 border-l-2  border-b-2 '></div>
            <div onClick={handleMove} id={id+'4'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10  border-r-2 border-y-2'></div>
            <div onClick={handleMove} id={id+'5'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 border-2'></div>
            <div onClick={handleMove} id={id+'6'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 border-l-2  border-y-2'></div>
            <div onClick={handleMove} id={id+'7'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10  border-r-2  border-t-2'></div>
            <div onClick={handleMove} id={id+'8'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 border-x-2 border-t-2'></div>
            <div onClick={handleMove} id={id+'9'} className=' t1 text-white font-semibold flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 border-l-2  border-t-2'></div>
        </div>
        </>

        
    )
}

export default Tic1