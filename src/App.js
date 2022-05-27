import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import MyPortfolio from './Pages/MyPortfolio/MyPortfolio';
import Blogs from './Pages/Blogs/Blogs';
import NotFound from './Pages/Shared/NotFound';
import Footer from './Pages/Shared/Footer';
import ContactUs from './Pages/Home/ContactUs';
import Products from './Pages/Products/Products';
import ReviewsNav from './Pages/Reviews/ReviewsNav';
import UpdateProduct from './Pages/Dashboard/UpdateProduct';
import RequireAuth from './Pages/Login/RequireAuth';
import Purchase from './Pages/Products/Purchase';
import Dashboard from './Pages/Dashboard/Dashboard';
import AllOrders from './Pages/Dashboard/AllOrders';
import AddProducts from './Pages/Dashboard/AddProduct';
import ManageProducts from './Pages/Dashboard/ManageProducts';
import Users from './Pages/Dashboard/Users';
import MyProfile from './Pages/Dashboard/MyProfile';
import MyReviews from './Pages/Dashboard/MyReviews';
import MyOrders from './Pages/Dashboard/MyOrders';
import RequireAdmin from './Pages/Login/RequireAdmin';
import Payment from './Pages/Dashboard/Payment';


function App() {
  return (
    <div className="">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/myportfolio' element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/reviews' element={<ReviewsNav></ReviewsNav>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/products' element={<Products></Products>}></Route>

        <Route path='/contactus' element={<ContactUs></ContactUs>}></Route>
        <Route path='/updateProduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>

        <Route path='/purchase/:id' element={<RequireAuth>
          <Purchase></Purchase>
        </RequireAuth>}></Route>

        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard></Dashboard>
        </RequireAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='review' element={<MyReviews></MyReviews>}></Route>
          <Route path='myOrders' element={<MyOrders></MyOrders>}></Route>
          <Route path='allOrders' element={<RequireAdmin>
            <AllOrders></AllOrders>
          </RequireAdmin>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='addProduct' element={<RequireAdmin>
            <AddProducts></AddProducts>
          </RequireAdmin>}></Route>
          <Route path='manageProducts' element={<RequireAdmin>
            <ManageProducts></ManageProducts>
          </RequireAdmin>}></Route>
          <Route path='users' element={<RequireAdmin>
            <Users></Users>
          </RequireAdmin>}></Route>
        </Route>

        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
