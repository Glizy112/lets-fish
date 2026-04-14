import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-50 px-8 py-4 flex gap-6">
      <Link to="/" className='text-gray-800 transition-opacity duration-150 hover:opacity-70'>Home</Link>
      <Link to="/admin" className='text-gray-800 transition-opacity duration-150 hover:opacity-70'>Dashboard</Link>
      <Link to="/awareness" className='text-gray-800 transition-opacity duration-150 hover:opacity-70'>Awareness</Link>
    </nav>
  );
}

export default Navbar;