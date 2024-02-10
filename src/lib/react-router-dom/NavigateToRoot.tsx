import { Navigate } from 'react-router-dom';
import { getRootPath } from './helpers';

export function NavigateToRoot() {
  return <Navigate to={getRootPath()} replace />;  
}