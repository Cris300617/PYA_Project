import { Routes, Route, BrowserRouter} from "react-router-dom"
import { Home, Login, ProtectedRoute, UserAuth, Dates, Formulario, Reporte } from "../index"
export function MyRoutes(){
    const {user} = UserAuth();
    return(
    
        <Routes>
            <Route element={<ProtectedRoute user={user} redirectTo="/login"/>}>
            <Route path="/" element = {<Home/>}/>
        </Route>


        <Route path="/login" element = {<Login/>}/>
        <Route path="/formulario" element = {<Formulario/>}/>
        <Route path="/reporte" element = {<Reporte/>}/>
        <Route path="/dates" element = {<Dates/>}/>
        
        </Routes>
    )

}