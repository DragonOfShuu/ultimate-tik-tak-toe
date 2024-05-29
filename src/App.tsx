import { useState } from 'react'
import './App.sass'
import SpecialButton from './components/SpecialButton';

function App() {
    const [counter, setCounter] = useState(0);

    return (
        <div className={`absolute inset-0`}>
            <div className={`size-full flex flex-col place-items-center place-content-center gap-2`}>
                {`Counter`}
                <div className={`flex flex-row items-center gap-3`}>
                    <SpecialButton onClick={()=> setCounter((x)=> x-1)}>
                        {`<`}
                    </SpecialButton>
                    {counter}
                    <SpecialButton onClick={()=> setCounter((x)=> x+1)}>
                        {'>'}
                    </SpecialButton>
                </div>
            </div>
        </div>
    )
}

export default App
