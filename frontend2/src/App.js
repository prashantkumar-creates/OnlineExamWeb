import React from "react";
import Login from "./components/Login";
import EachQuestion from "./components/EachQuestion";
import Question from "./components/Questions";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Jsontest from "./components/JsonTest";
import JsonShow from "./components/JsonShow";
import Teacher from "./components/Teacher";
import Answers from "./components/Answers";
import TeacherQuestionId from "./components/Teacher_QuestionsById";
import TeacherStudentAnswer from "./components/Teacher_studentAnswerById";
import StudentLogin from "./components/StudentLogin";
import StudentMainPage from "./components/StudentMainPage";
import StudentAnswersPage from "./components/StudentAnswersPage";
import EachAnswer from "./components/EachAnswer";
import Timer from "./components/Timer";

function App() {

  return (
    <div className="App">      
      <Router>

        <Route path="/studentLogin" exact>
          <StudentLogin />
        </Route>

        <Route path="/teacherLogin" exact>
          <Login />
        </Route>

        <Route path="/studentMainPage" exact>
          <StudentMainPage />
        </Route>
        
        <Route path="/studentAnswers" exact>
          <StudentAnswersPage/>
        </Route>

        <Route path="/studentEachAnswer" exact>
          <EachAnswer/>
        </Route>
        
        <Route path="/home2">
          <EachQuestion />
        </Route>

        {/* student answer sheet */}
        <Route path="/answer" exact>
          <Answers />
        </Route>

        <Route path="/teacher" exact>
          <Teacher />
        </Route>

        <Route path="/teacher/responces/*" exact>
          <TeacherQuestionId />
        </Route>

        <Route path="/teacher/update/*" exact>
          <EachQuestion />
        </Route>

        <Route path="/teacher/studentAnswer/*" exact>
          <TeacherStudentAnswer />
        </Route>

        <Route path="/" exact>
          <StudentLogin />
        </Route>

        <Route path="/Timer" exact>
          <Timer />
        </Route>

        {/* create question paper */}
        <Route path="/question"  >
          <Question />
        </Route>

        <Route path="/json" exact>
          <Jsontest />
        </Route>

        <Route path="/json/*" exact>
          <JsonShow />
        </Route>
      </Router>
    </div>
  );
}

export default App;