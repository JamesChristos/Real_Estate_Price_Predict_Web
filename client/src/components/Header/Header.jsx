import React from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link as ScrollLink } from 'react-scroll';

function Header() {
  const [menuOpened, setMenuOpened] = React.useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return menuOpened ? 'open' : '';
    }
    return '';
  };

  const handleLinkClick = () => {
    setMenuOpened(false);
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <div className="flexStart">
          <img className="logo-header" src="./7298.png" alt="logo" />
          <span className='logo-name'>UrbanRealty</span>
        </div>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className={`flexCenter h-menu ${getMenuStyles(menuOpened)}`}>
            <ScrollLink to="residences" smooth={true} duration={200} onClick={handleLinkClick}>
              Residences
            </ScrollLink>
            <ScrollLink to="values" smooth={true} duration={200} onClick={handleLinkClick}>
              Our Values
            </ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={200} onClick={handleLinkClick}>
              Contact Us
            </ScrollLink>
            <ScrollLink to="get-start" smooth={true} duration={200} onClick={handleLinkClick}>
              Get Start
            </ScrollLink>
            <button className="button">
              <ScrollLink to="contact" smooth={true} duration={200} onClick={handleLinkClick}>
                Contact
              </ScrollLink>
            </button>
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}

export default Header;
