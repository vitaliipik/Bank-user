import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import Header from "./components/Header";
import BankListPage from "./pages/BankListPage";


function App() {
    return (
        <Router>
            <div>
               <Header/>
                <Routes>
                    <Route path="/users" element={<UserListPage/>}/>
                    <Route path="/banks" element={<BankListPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
