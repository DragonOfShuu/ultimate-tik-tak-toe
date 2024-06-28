import "./App.sass";
import { usePager } from "./contexts/pager";
import GamePage from "./pages/game";
import StartGamePage from "./pages/startGame";
import TitlePage from "./pages/title";

function App() {
    const { page } = usePager();

    return (
        <div className={`absolute inset-0 bg-back`}>
            <div
                className={`size-full flex flex-col place-items-center place-content-center gap-2`}
            >
                {(() => {
                    switch (page) {
                        case "title":
                            return <TitlePage />;
                        case "startGame":
                            return <StartGamePage />;
                        case "game":
                            return <GamePage />;
                    }
                })()}
            </div>
        </div>
    );
}

export default App;
