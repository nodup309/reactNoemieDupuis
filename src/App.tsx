import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TierList from "./TierList";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <TierList />
        </DndProvider>
    );
}

export default App;
