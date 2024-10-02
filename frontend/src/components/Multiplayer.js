
import { useEffect, useState } from 'react';
import Tic from './Tic';
import io from 'socket.io-client'

const socket = io.connect("ws://super-tic-tac-server.vercel.app")

function Multiplayer() {
    
    const [finalO,setFinalO] = useState([]);
    const [finalX,setFinalX] = useState([]);
    const [playerRole,setPlayerRole] = useState("");
    const [prevBlock,setPrevBlock] = useState("")
    const [turn,setTurn] = useState("X");
    const [win,setWin] = useState("")
    const classList = [" border-r-2 border-b-2"," border-x-2  border-b-2"," border-l-2  border-b-2","border-r-2  border-y-2","border-2","border-l-2 border-y-2","border-r-2  border-t-2 ","border-x-2 border-t-2","border-l-2 border-t-2"]

    // console.log(finalO);
    // console.log(finalX)
    useEffect(()=>{
        if(finalO.length>2 || finalX.length>2){
            findWin();
            
        }
        socket.on("playerRole",(e)=>{
            
            setPlayerRole(e);
            console.log("player "+e)
        })
        socket.on("move",(playerRole1,blockId)=>{
            document.getElementById(blockId).innerHTML = playerRole1;
            
            //updating prev block for all
            if(finalO.includes(parseInt(blockId.charAt(1))) || 
            finalX.includes(parseInt(blockId.charAt(1)))) setPrevBlock("");
            else setPrevBlock(blockId);

            //changing turn
            setTurn(playerRole1 === "X"?"O":"X");


        })
    },[finalO,finalX,turn])
    

    const findWin = ()=>{

        const logic = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        
        logic.forEach((list)=>{
            if(finalO.includes(list[0]) && 
            finalO.includes(list[1]) && 
            finalO.includes(list[2])){
                setTimeout(() => {
                    setWin("O") 
                }, 1000);
                
            }else if(finalX.includes(list[0]) && 
            finalX.includes(list[1]) && 
            finalX.includes(list[2])){
                setTimeout(() => {
                    setWin("X") 
                }, 1000); 
            }
        })
    }


    return (
            <div className="w-full bg-gradient-to-tr from-teal-400 to-blue-400 flex-col h-screen flex justify-center items-center">
            
            {win === "X" && <div className="text-6xl font-extrabold text-yellow-200 bg-gray-900 p-6 rounded-xl shadow-xl animate-pulse">X wins!</div>}
            {win === "O" && <div className="text-6xl font-extrabold text-yellow-200 bg-gray-900 p-6 rounded-xl shadow-xl animate-pulse">O wins!</div>}
            {win === "" && (<>
                <div className='text-xl font-semibold text-slate-900  p-2 absolute top-2 left-2'>Me :  {playerRole}</div>
                <div className='text-6xl font-extrabold text-yellow-200  p-6 '>{turn}'s turn</div>
                <div className='game grid grid-cols-3 gap-2'>
                    {classList.map((item, idx) => (
                        <div className={`${item} border-4 rounded-lg transition-transform duration-200 hover:scale-105`} key={idx}
                            style={{
                                backgroundColor:  idx % 2 === 0 ? 
                                (idx + 1 == prevBlock.charAt(1) ? "#157d50" :"#4caf50") : 
                                (idx + 1 == prevBlock.charAt(1) ? "#0062e3" :"#2196f3"),
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                transform:idx + 1 == prevBlock.charAt(1) ?'scale(1.05)':'scale(1)'
                            }}>
                            {finalO.includes(idx + 1) && 
                                <div className="winO text-6xl sm:text-8xl font-bold flex justify-center items-center h-full text-white">O</div>}
                            {finalX.includes(idx + 1) && 
                                <div className="winO text-6xl sm:text-8xl font-bold text-white flex justify-center items-center h-full">X</div>}
                            {!finalO.includes(idx + 1) && !finalX.includes(idx + 1) && (
                                <div style={{
                                    transform: `rotate(${idx % 2 === 0 ? '-4deg' : '4deg'})`,
                                    transition: 'transform 0.2s ease-in-out'
                                }}>
                                    <Tic setTurn={setTurn} turn={turn} prevBlock={prevBlock} setPrevBlock={setPrevBlock} id={idx + 1} 
                                        setFinalO={setFinalO} setFinalX={setFinalX}
                                        playerRole = {playerRole}
                                        finalO={finalO} finalX={finalX}
                                        socket = {socket}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </>)}
        </div>

    );
}

export default Multiplayer;
