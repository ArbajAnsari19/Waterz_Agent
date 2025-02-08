import React from "react";
import Navbar from "../Navbar/Navbar";
import {ContactForm} from "../Contact/Contact";
import styles from "../../styles/Layouts/MainLayout.module.css"

type MainLayoutProps = {
    children: React.ReactNode; 
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return(
        <div className={styles.comp_body}>
            <Navbar/>
            {children}
            <ContactForm/>
        </div>
    )
}

export default MainLayout;