import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import Home from "./pages/Home";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Page404 from './pages/Page404';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path='/registration' element={<Register/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/add-post' element={<AddPost/>} />
                    <Route path='/edit-post/:id' element={<EditPost/>} />
                    <Route path='*' element={<Page404/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
