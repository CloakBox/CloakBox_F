import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./login/Login.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Login />}></Route>
              <Route path="/login" element={ <Login />}></Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
