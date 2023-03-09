import { Route, Routes } from "react-router-dom";
import routes from "../../shared/constants/routes";
import Main from '../../app/main/Main';
import Auth from '../../app/auth/Auth'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.MAIN} element={<Main />}/>
      <Route path={routes.AUTH} element={<Auth />}/>
    </Routes> 
  ); 
}