import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomeComponent from './Components/Home/HomeComponent';
import CreateQuiz from './Components/Create/CreateQuiz';
import Quizdisplay from './Components/Quizzes/Quizdisplay';
import QuestionList from './Components/QuestionList/QuestionList';
import LoginComponent from './Components/login_signup/LoginComponent';
import Random from './Components/Random/Random';
import SignupComponent from './Components/login_signup/SignupComponent';
import { useContext } from 'react';
import ResultPage from './Components/Result/ResultPage';
import Leaderboard from './Components/leaderboard/LeaderBoard';
import ProfilePage from './Components/profilePage/ProfilePage';
import QuizAI from './Components/quizai/QuizAI';
import QuizIntro from './Components/quizai/QuizIntro';
import { QuizContext, QuizProvider } from './Components/context/QuizContext';
import JustResultai from './Components/quizai/JustResultai'
import QuizApp from './App2';

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
          <Route path="/random" element={<Random />} />
          
          <Route path="/CreateQuiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
          <Route path="/QuizPage" element={<ProtectedRoute><Quizdisplay /></ProtectedRoute>} />
          <Route path="/Quiz" element={<ProtectedRoute><QuestionList /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
          <Route path="/AI" element={<ProtectedRoute><QuizAI/></ProtectedRoute>}/>
          <Route path="/form" element={<QuizIntro/>}/>
          <Route path="/AiResult" element={<JustResultai/>}/>
          <Route path="/sample" element={<QuizApp/>}/>

          
          
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
