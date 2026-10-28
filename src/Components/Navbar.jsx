import { useDispatch, useSelector } from "react-redux"
import { setActiveTabs } from "../Redux/Tabs";

const Navbar = () => {
    const all = useSelector((state) => state.tabs.activeTabs)
    const dispatch = useDispatch();
    const tabs = ["Home", "Services", "Vehicles", "Stores", "Models"];
    return (
        <>

            <header className="navbar">
                <a className="logo" href="">
                    <span className="logo-mark">L</span>
                    <span>Lexus</span>
                </a>

                <nav className="nav-links ">
                    {tabs.map(
                        (tab, index) => (
                            <a
                            key={index}
                            onClick={() => {
                                dispatch(setActiveTabs(tab))
                                console.log('all', all);
                                console.log('Tab', tab);
                                
                            }}
                            
                            className={all == tab ? 'active':''}
                            >
                                <span className="nav-dot">•</span> {tab}
                            </a>
                        )
                    )}
                </nav>

                <div className="nav-actions">
                    <button className="search-button" aria-label="Search">
                        ⌕
                    </button>
                    <a href="" className="contact-button">
                        Contact Us
                    </a>
                </div>
            </header>
        </>


    )
}

export default Navbar