import logo from '../assets/img/logo512.png';
export default function Header() {
  return (
    <nav className='nav-bar'>
      <p>
        <img src={logo} alt='logo' />
      </p>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/contact-us'>Contact US</a>
        </li>
        <li>
          <a href='/contact-us'>New</a>
        </li>
      </ul>
    </nav>
  );
}
