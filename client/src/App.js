import './App.css';
import {Routes, Route} from "react-router-dom"
import DetailPage from './components/detailPage/DetailPage'
import FormPage from './components/formPage/FormPage'
import HomePage from './components/homePage/HomePage'
import LandingPage from './components/landingPage/LandingPage'
import ErrorBoundary from './services/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/form' element={<FormPage/>} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;

