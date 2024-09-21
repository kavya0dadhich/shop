import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component }) => {
  const token = Cookies.get('token');
  console.log(token);
  return token ? Component : <Navigate to="/" />;
};

// Add prop-types validation
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
