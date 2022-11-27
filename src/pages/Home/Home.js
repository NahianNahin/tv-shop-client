import React from 'react';
import useTitle from '../../hooks/useTitle';
import Advertisement from './Advertisement';
import Banner from './Banner';
import Categories from './Categories';
import Discount from './Discount';

const Home = () => {
    useTitle('Home');
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Categories></Categories>
            <Discount></Discount>
        </div>
    );
};

export default Home;