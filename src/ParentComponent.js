import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { WalletContext } from "./context/WalletContext";

import Footer from './common/FooterComponent';
import Header from './common/HeaderComponent';
import ConnectWallet from './ConnectWallet';
import LandingPage from './LandingPage';
import Mintnfts from './Mintnfts';
import LandingPages from './LandingPage2';
import './resources/css/home.css';
import CreateToken from './app/createToken';
import Access from './app/access';

const ParentComponent = () => {
    const [walletId, setWalletId] = useState(null);
    return (
        <div>
            <WalletContext.Provider value={{ walletId, setWalletId }}>
                <Router>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<ConnectWallet />} />
                        <Route exact path="/mint" element={<Mintnfts />} />
                        <Route exact path='/token' element={<CreateToken />} />
                        <Route exact path='/access' element={<Access />} />
                        {/* <Route exact path="/landing-pages" element={<LandingPage />} /> */}
                        <Route exact path="/landing-page" element={<LandingPages />} />
                        <Route exact path="*" element={<ConnectWallet />} />
                    </Routes>
                    <Footer />
                </Router>

            </WalletContext.Provider>
        </div>
    );
}

export default ParentComponent;