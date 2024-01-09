import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/HomeView';
import Layout from './components/layout/Layout';
import LoginView from './pages/LoginView';
import LogoutView from './pages/LogoutView';
import SignupView from './pages/SignupView';
import ActivationView from './pages/ActivationView';
import InfoView from "./pages/InfoView";
import PasswordRecoveryView from './pages/PasswordRecoveryView';
import PasswordUpdateView from './pages/PasswordUpdateView';
import PersonalAreaView from './pages/PersonalAreaView';
import ConfigurationView from './pages/ConfigurationView';
import "./App.css";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="logout" element={<LogoutView />} />
        <Route path="signup" element={<SignupView />} />
        <Route path="personal-area/:tab" element={<PersonalAreaView />} />
        <Route path="activation/:uid/:token" element={<ActivationView />} />
        <Route path="password-recovery" element={<PasswordRecoveryView />} />
        <Route path="password-update/:uid/:token" element={<PasswordUpdateView />} />
        <Route path="about" element={<InfoView />} />
        <Route path="config" element={<ConfigurationView />} />
        
        </Routes>
    </Layout>

  );
}

export default App;