import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/loader";
import Header from "./components/header";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Search = lazy(() => import("./pages/search"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        {/* Header */}
        <Routes>
          {/* For all users */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not logged in */}
          <Route path="/login" element={<Login />} />
          {/* Logged in user routes */}
          <Route>
            <Route path="/shipping" element={<Shipping />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
