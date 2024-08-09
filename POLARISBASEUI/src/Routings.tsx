import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FullPortal from './Portal';
import Header from './Header';
// NOTE: You should update this to be the same value that's in
//  the src/index.html <base href="value"> to allow the React Router
//  to identify the paths correctly.
const baseURL = '/';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routings = () => {
  return (
    <div>
      <Routes>
        
        <Route path={`${baseURL}portal`} Component={FullPortal} />
        <Route path={`${baseURL}header`} Component={Header} />
        <Route path={`${baseURL}header.html`} Component={Header} />
        <Route path='*' Component={FullPortal} />
        {/* <Route path={`${baseURL}portal`} Component={FullPortal} /> */}
        <Route path={`${baseURL}portal.html`} Component={FullPortal} />
        {/* <Route path={`${baseURL}home`} Component={home} />
        <Route path={`${baseURL}home.html`} Component={home} /> */}
        
      </Routes>
    </div>
  );
};

export default Routings;
