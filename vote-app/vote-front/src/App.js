import './App.css';
import{Route,Routes, Navigate,HashRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register';
import Main from './Main'
import CreateVote from './Create-vote';
import ViewVote from './ViewVote'
import CurrentUserInfo from './CurrentUserInfo';
import Myvotes from './Myvotes';
import Create from './Create';

function App() {
  return (
    <CurrentUserInfo>
    <HashRouter>   
      <Routes>
        <Route exact path='/' element={<Navigate to="/main"/>}/>
        <Route path='/main/*' element={<Main/>}>
          <Route path='create' element={<Create/>} />
        <Route path="myvotes" element={<Myvotes/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/view-vote/:voteId' element={<ViewVote/>} />
        <Route path='/create-vote' element={<CreateVote/>} />
      </Routes>
    </HashRouter>
    </CurrentUserInfo>
  );
}

export default App;
