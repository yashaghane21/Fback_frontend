import React from 'react'
import Home from "../Components/Home"
import Footer from "../Components/Footer"
import Nav from "../Components/Nav"
import Dash from './Dash'
const Layout = () => {
    return (
        <div>
            <Nav />
            <Home />
            <Dash />
            <Footer />
        </div>

    )
}

export default Layout
