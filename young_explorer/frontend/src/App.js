import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> MY APP
      </div>
    </Router>
  );
}

export default App;
