import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QuizProvider, QuizContext } from './Components/context/Quizcontext';
import HomeComponent from './Components/Home/HomeComponent';
import CreateQuiz from './Components/Create/CreateQuiz';
import Quizdisplay from './Components/Quizzes/Quizdisplay';
import QuestionList from './Components/QuestionList/QuestionList';
import LoginComponent from './Components/login_signup/LoginComponent';
import SignupComponent from './Components/login_signup/SignupComponent';
import { useContext } from 'react';
import ResultPage from './Components/Result/ResultPage';
import Leaderboard from './Components/leaderboard/LeaderBoard';
import ProfilePage from './Components/profilePage/ProfilePage';
import QuizAI from './Components/quizai/QuizAI';

function ProtectedRoute({ children }) 
{
  const { username } = useContext(QuizContext);
  return username ? children : <Navigate to="/" />;
}

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path="/CreateQuiz" element={<CreateQuiz />} />
          <Route path="/QuizPage" element={<Quizdisplay />} />
          <Route path="/Quiz" element={<QuestionList />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/AI" element={<QuizAI/>}/>
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
