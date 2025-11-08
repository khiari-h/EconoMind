import Navbar from './Navbar'; // Import the correct Navbar
import PropTypes from 'prop-types';

function Layout({ children, navigate, currentPage }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar navigate={navigate} currentPage={currentPage} />
      <main>{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navigate: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Layout;