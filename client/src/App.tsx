import { Route, Routes } from "react-router-dom";
import Home from "./(root)/pages/Home";
import Login from "./(root)/pages/Login";
import Register from "./(root)/pages/Register";
import RootLayout from "./(root)/RootLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
