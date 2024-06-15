import { useSelector } from "react-redux";
// outlet is used to show the children (dashboard)
import { Outlet ,Navigate} from "react-router-dom";

export default function PrivateRoute() {
    const {currentUser} = useSelector((state)=>state.user) 
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}
