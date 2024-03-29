import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateRouteMentor from "./components/private-route/PrivateRouteMentor";
import PrivateRouteAdmin from "./components/private-route/PrivateRouteAdmin";
import Landing from "./components/landing/Landing";
import LandingMentor from "./components/landingMentor/LandingMentor";
import LandingAdmin from "./components/landingAdmin/LandingAdmin";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import RegisterMentor from "./components/authMentor/RegisterMentor";
import LoginMentor from "./components/authMentor/LoginMentor";
import RegisterAdmin from "./components/authAdmin/RegisterAdmin";
import LoginAdmin from "./components/authAdmin/LoginAdmin";
import VerifyEmail from "./components/verifyEmail/VerifyEmail";
import About from "./components/about/About";
import Course from "./components/course/Course";
import Training from "./components/training/Training";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import LiveClassList from "./components/liveClass/LiveClassList";
import DashboardMentor from "./components/dashboardMentor/DashboardMentor";
import ScheduleClass from "./components/dashboardMentor/ScheduleClass";
import DashboardAdmin from "./components/dashboardAdmin/DashboardAdmin";
import ViewMentor from "./components/dashboardAdmin/ViewMentor";
import ViewMentorDetail from "./components/dashboardAdmin/ViewMentorDetail";
import ViewLiveClass from "./components/dashboardAdmin/ViewLiveClass";
import QuesBankDashboard from "./components/dashboardAdmin/QuesBankDashboard";
import QuesBankEditQues from "./components/dashboardAdmin/QuestionBankEditQues";
import Subject from './components/questionBank/subjects';
import QuestionBankCourse from './components/questionBank/courses';
import QuestionBank from './components/questionBank/questionBank';
import Report from './components/questionBank/report';
import ViewStudent from "./components/dashboardAdmin/ViewStudent";
import MyLiveClass from "./components/dashboard/MyLiveClass";
import LiveClassDetail from "./components/liveClass/LiveClassDetail";
import PostPayment from "./components/payment/PostPayment";
import ForgotPass from "./components/forgotPass/ForgotPass";
import ForgotPassMentor from "./components/forgotPass/ForgotPassMentor";
import ForgotPassAdmin from "./components/forgotPass/ForgotPassAdmin";
import Terms from "./components/LegalDocuments/Terms";
import Privacy from "./components/LegalDocuments/Privacy";
import Disclaimer from "./components/LegalDocuments/Disclaimer";
import Contact from "./components/contact/Contact";
import ChangePass from "./components/forgotPass/ChangePass";
import AccountMentor from "./components/dashboardMentor/AccountMentor";
import Subjects from "./components/dashboardAdmin/Subjects";
import Mentors from "./components/landing/Mentors";
import MentorsDetails from "./components/landing/MentorsDetails";
import ReturnRefund from "./components/LegalDocuments/ReturnRefund";
import ConfirmLiveRegistration from "./components/liveClass/ConfirmLiveRegistration";
import CreateModule from "./components/dashboardAdmin/CreateModule";
import Coupons from "./components/dashboardAdmin/Coupons";
import StudentRoles from "./components/dashboardAdmin/StudentRoles";

export default function PathRoute() {
  return (
    <Switch>
      <React.Fragment>
        <Navbar />
        <main className="no-padding">
          <Route exact path="/" component={Landing} />
          <Route exact path="/mentor" component={LandingMentor} />
          <Route exact path="/admin" component={LandingAdmin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpass" component={ForgotPass} />
          <Route exact path="/mentor/register" component={RegisterMentor} />
          <Route exact path="/mentor/login" component={LoginMentor} />
          <Route exact path="/mentor/forgotpass" component={ForgotPassMentor} />
          <Route exact path="/admin/register" component={RegisterAdmin} />
          <Route exact path="/admin/login" component={LoginAdmin} />
          <Route exact path="/admin/forgotpass" component={ForgotPassAdmin} />
          <Route exact path="/changepass/:token" component={ChangePass} />
          <Route exact path="/verifyemail" component={VerifyEmail} />
          <Route exact path="/about" component={About} />
          <Route exact path="/liveclass" component={LiveClassList} />
          <Route exact path="/liveClass/:id" component={LiveClassDetail} />
          <Route exact path="/course" component={Course} />
          <Route exact path="/training" component={Training} />
          <Route exact path="/success" component={PostPayment} />
          <Route exact path="/failed" component={PostPayment} />
          <Route exact path="/cancel" component={PostPayment} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/disclaimer" component={Disclaimer} />
          <Route exact path="/returnRefund" component={ReturnRefund} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/mentors" component={Mentors} />
          <Route exact path="/mentors/details/:id" component={MentorsDetails} />

          <PrivateRoute exact path="/questionbank" component={QuestionBankCourse} />
          <PrivateRoute exact path="/questionbank/result" component={Report} />
          <PrivateRoute exact path="/questions/subjects/:courseId" component={Subject} />
          <PrivateRoute exact path="/questions/:id" component={QuestionBank} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/myliveclass/:id" component={MyLiveClass} />
          <PrivateRoute exact path="/liveclass/confirm/:id" component={ConfirmLiveRegistration} />
          <PrivateRouteMentor exact path="/mentor/dashboard" component={DashboardMentor} />
          <PrivateRouteMentor exact path="/mentor/dashboard/scheduleclass" component={ScheduleClass} />
          <PrivateRouteMentor exact path="/mentor/account" component={AccountMentor}/>
          <PrivateRouteAdmin exact path="/admin/dashboard/subjects" component={Subjects} />
          <PrivateRouteAdmin exact path="/admin/dashboard" component={DashboardAdmin} />
          <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor" component={ViewMentor} />
          <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor/:mentorid" component={ViewMentorDetail} />
          <PrivateRouteAdmin exact path="/admin/dashboard/viewliveclass" component={ViewLiveClass} />
          <PrivateRouteAdmin exact path="/admin/dashboard/viewstudent" component={ViewStudent} />
          <PrivateRouteAdmin exact path="/admin/createmodule" component={CreateModule} />
          <PrivateRouteAdmin exact path="/admin/dashboard/coupons"  component={Coupons} />
          <PrivateRouteAdmin exact path="/admin/dashboard/studentroles" component={StudentRoles} />
          <PrivateRouteAdmin exact path="/admin/dashboard/questionBank/dashboard" component={QuesBankDashboard} />
          <PrivateRouteAdmin exact path="/admin/dashboard/questionBank/edit/:questionId" component={QuesBankEditQues} />
        </main>
        <Footer />
      </React.Fragment>
    </Switch>
  );
}
