
import './App.css';
import Ingame from './components/Ingame';
import Multiplayer from "./components/Multiplayer"
import Home from './components/Home';
import { Route,Routes} from 'react-router-dom'

function App() {
    

    return (
        <div className="App flex justify-center items-center w-full">
            <Routes>
                <Route path='/' element = {<Home/>}/>
                <Route path='ingame' element = {<Ingame/>}/>
                <Route path='multiplayer' element = {<Multiplayer/>}/>
            </Routes>
        </div>

    );
}

export default App;
