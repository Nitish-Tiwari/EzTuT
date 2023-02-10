import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home.js';
import CreateStudent from './pages/CreateStudent.js';
import Navbar from './pages/Navbar.js';
import Dashboard from './pages/Dashboard.js';
import Teacher from './pages/Teacher.js';
import Profile from './pages/Profile.js';
import Transaction from './pages/Transaction.js'
import Test from './pages/Test.js';
import StudentDetail from './pages/StudentDetail.js';
import TeacherDetail from './pages/TeacherDetail.js';
import ReminderPage from './pages/ReminderPage.js';

function App() {
  return <div className='App'>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/students' element={<Home />}></Route>
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
        <Route exact path='/registration' element={<CreateStudent />}></Route>
        <Route exact path='/student/:id' element={<StudentDetail />} />
        <Route exact path='/teacher/:id' element={<TeacherDetail />} />
        <Route exact path='/teachers' element={<Teacher />}></Route>
        <Route exact path='/profile' element={<Profile />}></Route>
        <Route exact path='/tranactions' element={<Transaction />}></Route>
        <Route exact path='/test' element={<Test />}></Route>
        <Route exact path='/reminder' element={<ReminderPage />}></Route>
        <Route exact path='/' element={<Dashboard />}></Route>
      </Routes>
    </Router>
  </div>

}

export default App;
