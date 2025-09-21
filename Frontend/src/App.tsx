import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { UserForm } from './user/UserForm';
import { UserData } from './user/UserData';
import { Welcome } from './layout/Welcome';
import { Dashboard } from './layout/Dashboard';
import { About } from './layout/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          pauseOnHover
          toastClassName={(toast) => {
            // Base glass + blur + rounded + shadow
            let base =
              "backdrop-blur-md rounded-xl shadow-lg p-4 font-semibold text-center border w-80";

            // Colored glass background and border per toast type
            if (toast?.type === "success")
              base += " bg-green-400/30 border-green-400 text-white";
            else if (toast?.type === "error")
              base += " bg-red-400/30 border-red-400 text-white";
            else if (toast?.type === "info")
              base += " bg-blue-400/30 border-blue-400 text-white";
            else if (toast?.type === "warning")
              base += " bg-yellow-400/30 border-yellow-300 text-white";

            return base;
          }}
        />
        <div style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userform/:id?" element={<UserForm />} />
            <Route path="/userdata" element={<UserData />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
