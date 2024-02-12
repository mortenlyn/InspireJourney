import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> MY APP
          <div className="innhold">
            <Routes>
              <Route path="/eksempel" element={<Header/>}>
              </Route>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
