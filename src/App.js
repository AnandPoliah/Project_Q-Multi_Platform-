import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomeComponent from './Components/Home/HomeComponent';
import Quizdisplay from './Components/Quizzes/Quizdisplay';
import QuestionList from './Components/QuestionRender/QuestionList';
import SignupComponent from './Components/login_signup/SignupComponent';
import { useContext } from 'react';
import ResultPage from './Components/Result/ResultPage';
import Leaderboard from './Components/leaderboard/LeaderBoard';
import ProfilePage from './Components/profilePage/ProfilePage';
import QuizAI from './Components/QuizAI/QuizAI';
import QuizIntro from './Components/QuizAI/QuizIntro';
import { QuizContext, QuizProvider } from './Components/context/QuizContext';
import QuizTemplate from './Components/QuestionRender/QuizTemplate';
import TopicList from './Components/TopicList/TopicList';
import Adaptive from './Components/Adaptive/Adaptive';
import QuizCreator from './Components/Quiz_Creator/QuizCreator';
import AdaptList from './Components/Adaptive/AdaptList';
import ResultOfAIQuiz from './Components/QuizAI/ResultOfAIQuiz';

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

        
         {/* <Route path="/signup" element={<SignupComponent />} />
          <Route path="/" element={<HomeComponent />} />

          <Route path="/TopicList" element={<TopicList/>} />
          <Route path="/QuizPage" element={<ProtectedRoute><Quizdisplay /></ProtectedRoute>} />

          <Route path="/Quiz" element={<ProtectedRoute><QuestionList /></ProtectedRoute>} />
          <Route path="/QuizTemplate" element={<ProtectedRoute><QuizTemplate/></ProtectedRoute>} />
          
          <Route path="/form" element={<ProtectedRoute><QuizIntro/></ProtectedRoute>}/>
          <Route path="/AI" element={<ProtectedRoute><QuizAI/></ProtectedRoute>}/>
          <Route path ="ResultOfAIQuiz" element={<ProtectedRoute><ResultOfAIQuiz/></ProtectedRoute>}/>
          
          <Route path="/Adapt" element={<ProtectedRoute><Adaptive/></ProtectedRoute>}/>
          <Route path="AdaptList" element={<ProtectedRoute><AdaptList/></ProtectedRoute>} />

          <Route path="/create" element={<ProtectedRoute><QuizCreator/></ProtectedRoute>}/>
          
          <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
          */}

          
          <Route path="/signup" element={<SignupComponent />} />
<Route path="/" element={<HomeComponent />} />

<Route path="/TopicList" element={<TopicList />} />
<Route path="/QuizPage" element={<Quizdisplay />} />
<Route path="/Quiz" element={<QuestionList />} />
<Route path="/QuizTemplate" element={<QuizTemplate />} />
<Route path="/form" element={<QuizIntro />} />
<Route path="/AI" element={<QuizAI />} />
<Route path="/ResultOfAIQuiz" element={<ResultOfAIQuiz />} />
<Route path="/Adapt" element={<Adaptive />} />
<Route path="/AdaptList" element={<AdaptList />} />
<Route path="/create" element={<QuizCreator />} />
<Route path="/result" element={<ResultPage />} />
<Route path="/leaderboard" element={<Leaderboard />} />
<Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
