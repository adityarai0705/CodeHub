import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../redux/slices/authSlice";
import Spinner from "../components/Spinner/Spinner"

export function AuthWrapper({ children }) {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        async function checkSession() {
            if (!authChecked.current) {
                console.log("Checking");
                await dispatch(checkAuth());
                console.log("Checked")
                setAuthChecked(true);
            }
        }
        checkSession();
    }, []);

    if (!authChecked) {
        return <Spinner />
    }

    return children;
}
