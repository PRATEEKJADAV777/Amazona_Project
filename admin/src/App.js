
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout';
import Path from './Common/Path';
import DashBoardScreen from './Screens/DashBoard/DashBoardScreen';
import ProductScreen from './Screens/Product/ProductScreen';
import { useState } from 'react';
import LoginScreen from './Screens/Login/LoginScreen';
import UserData from './Screens/User/UserData';
import MultiTaskDisplay from './Component/MultiTaskDisplay/MutliTaskDisplay';
import EditProduct from './Screens/Product/ManageProduct/EditProduct';
import EditProdcut from './Screens/Product/ManageProduct/EditProductDilog';
import CategoryTable from './Screens/Product/CategoryManage/Category_Tbl';

function App() {
  const [Auth, setAuth] = useState(localStorage.getItem("TOKEN") ? true : false)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={Path.dashBoard} element={<Layout Auth={Auth} component={<DashBoardScreen />} />} />
          <Route path={Path.product} element={<Layout Auth={Auth} component={<ProductScreen />} />} />
          <Route path={Path.ShowProuct} element={<Layout Auth={Auth} component={<EditProduct />} />} />
          <Route path={Path.userdata} element={<Layout Auth={Auth} component={<UserData />} />} />
          <Route path={Path.EditProdcut} element={<Layout Auth={Auth} component={<EditProdcut />} />} />
          <Route path={Path.Category} element={<Layout Auth={Auth} component={<CategoryTable />} />} />
          <Route path={Path.login} element={<LoginScreen Auth={Auth} setAuth={setAuth} />} />
          <Route path="multi" element={<MultiTaskDisplay />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
