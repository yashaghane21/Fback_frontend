import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const Authprovider = ({ children }) => {
    const [auth, setauth] = useState({
        user: null,
        token: "",
    });

    const [theme, settheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")  //theme context
    const [sem, setsem] = useState()
    const [cusername, setcusername] = useState(localStorage.getItem("username") ? localStorage.getItem("username") : "")


    useEffect(() => {
        const data = localStorage.getItem("auth")

        if (data) {
            const parseData = JSON.parse(data);
            setauth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
    }, []);



    const value = {
        theme, settheme, auth, setauth, sem, setsem,cusername,setcusername
    }
    return (
        <Authcontext.Provider value={value}>
            {children}
        </Authcontext.Provider>
    );
};
const useAuth = () => useContext(Authcontext);
export { useAuth, Authprovider };