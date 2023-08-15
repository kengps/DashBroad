import "react-quill/dist/quill.snow.css";
import "./App.css";
import MainPage from "./layouts/MainPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <MainPage />
    </div>
  );
}

export default App;
