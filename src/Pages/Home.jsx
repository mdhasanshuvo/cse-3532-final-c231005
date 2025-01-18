import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Category from '../Components/Category';

const Home = () => {

    return (
        <div className='container px-4 mx-auto'>
            <NavBar></NavBar>
            <Category></Category>
        </div>
    );
};

export default Home;