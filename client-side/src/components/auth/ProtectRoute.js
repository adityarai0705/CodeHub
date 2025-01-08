import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';


const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        async function check() {
            if (!loading) {
                await dispatch(checkAuth());
                setInitializing(false);
            }
            else {
                setInitializing(false);
            }
        }
        check();
    }, []);

    if (initializing) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
