import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(<App onDragStart={(event) => event.preventDefault()} />);