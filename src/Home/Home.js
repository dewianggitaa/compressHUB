import React from 'react'
import Header from '../Header/Header'
import Menu from './Menu/Menu'


const Home = () => {
    return (
        <>
            <Header/>
            <div class="px-40 py-20 text-white min-h-screen bg-dark">
                <p class="flex justify-center text-3xl lg:text-4xl font-bold pt-16 pb-6">Welcome to convertHUB</p>
                <p class="flex justify-center text-md text-center lg:text-xl">Select what kind of file you need to convert:</p>
                <div class="flex gap-10 justify-center pt-10">
                    <Menu name="Image" link="/image"/>
                    <Menu name="Audio" link="/audio"/>
                </div>
            </div>
        </>
        
    )
}

export default Home