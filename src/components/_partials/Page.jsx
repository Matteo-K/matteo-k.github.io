import { Navigate } from 'react-router-dom';

export default function Page(props) {
  if (!localStorage.getItem("isLogin")) {
    return <Navigate to="/login" replace />;
  }

  return <>{props.children}</>
}