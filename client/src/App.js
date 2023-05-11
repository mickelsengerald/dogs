import './App.css';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom"
import DetailPage from './components/detailPage/DetailPage'
import FormPage from './components/formPage/FormPage'
import HomePage from './components/homePage/HomePage'
import LandingPage from './components/landingPage/LandingPage'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/form' element={<FormPage/>}></Route>
        <Route path='/detail/:id' element={<DetailPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
