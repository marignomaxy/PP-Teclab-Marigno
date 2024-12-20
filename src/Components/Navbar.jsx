import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Utils/img/amapola.png';
import { AuthContext } from '../Context/authContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { login, user, handlerLogout } = useContext(AuthContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownFixed, setDropdownFixed] = useState(false);
  const userRole = localStorage.getItem('role') || '';
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    if (!isDropdownFixed) {
      setDropdownVisible(false);
    }
  };

  const id = localStorage.getItem('id');

  const handleToggleDropdown = () => {
    setDropdownFixed(!isDropdownFixed);
    setDropdownVisible(!isDropdownFixed);
  };

  const handleLog = () => {
    handlerLogout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-primaryGreen p-5">
      <div className="flex flex-col xl:flex-row xl:justify-between container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <NavLink to="/">
              <img className="imagenLogoNav" src={Logo} alt="Logo Amapola" />
            </NavLink>
          </div>
          {/* Hamburger Button for Mobile */}
          <div className="xl:hidden flex items-center" onClick={toggleMenu}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>
        {/* Desktop Navigation Links */}
        <div
          className={`xl:flex flex-col xl:flex-row items-center gap-4 ${menuOpen ? 'flex' : 'hidden'} mt-5 xl:mt-0`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-black bg-secondaryGreen rounded-22'
                : 'text-white'
            }
          >
            <h2 className="font-poppins px-4 py-2 text-xl">Tienda</h2>
          </NavLink>
          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              isActive
                ? 'text-black bg-secondaryGreen rounded-22'
                : 'text-white'
            }
          >
            <h2 className="font-poppins px-4 py-2 text-xl">Sobre nosotros</h2>
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              isActive
                ? 'text-black bg-secondaryGreen rounded-22'
                : 'text-white'
            }
          >
            <h2 className="font-poppins px-4 py-2 text-xl">Contacto</h2>
          </NavLink>
          {login ? (
            <>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h2
                  className="font-poppins px-4 py-2 text-xl text-white cursor-pointer"
                  onClick={handleToggleDropdown}
                >
                  Bienvenido {user}
                </h2>
                {isDropdownVisible && (
                  <div className="absolute w-80 bg-white rounded-md shadow-lg z-10">
                    {userRole.includes('ROLE_ADMIN') ? (
                      <NavLink
                        to="/adminPanel"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-md"
                      >
                        Panel de Administrador
                      </NavLink>
                    ) : (
                      <NavLink
                        to={`/detalleUsuario/${id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-md"
                      >
                        Ver Facturas
                      </NavLink>
                    )}
                    <button
                      onClick={handleLog}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-md"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? 'text-black bg-secondaryGreen rounded-22'
                  : 'text-white'
              }
            >
              <h2 className="font-poppins px-4 py-2 text-xl">Iniciar sesión</h2>
            </NavLink>
          )}

          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              isActive
                ? 'text-black bg-secondaryGreen rounded-22'
                : 'text-white'
            }
          >
            {({ isActive }) => (
              <h2 className="font-poppins px-4 py-2 text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  width="30pt"
                  height="30pt"
                  viewBox="0 0 1280.000000 1211.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,1211.000000) scale(0.100000,-0.100000)"
                    fill={isActive ? '#000000' : '#FFFFFF'}
                    stroke="none"
                  >
                    <path d="M262 12086 c-117 -44 -191 -114 -232 -223 -33 -88 -35 -122 -10 -194 28 -81 48 -114 102 -166 81 -79 76 -78 1028 -237 481 -81 886 -150 899 -154 22 -7 177 -395 1407 -3508 761 -1924 1384 -3504 1384 -3511 0 -6 -208 -172 -462 -369 -604 -467 -724 -585 -846 -829 -89 -178 -125 -331 -125 -520 1 -186 23 -266 121 -430 122 -205 299 -365 516 -465 51 -23 85 -44 80 -49 -5 -5 -38 -18 -72 -29 -109 -36 -191 -89 -282 -181 -93 -94 -156 -200 -185 -316 -87 -338 90 -698 413 -836 58 -25 240 -69 285 -69 41 0 196 33 257 55 93 33 175 88 262 175 72 73 94 103 132 181 105 219 100 443 -15 660 -40 74 -151 195 -219 239 -48 31 -59 44 -43 53 18 10 6178 -14 6188 -24 7 -7 0 -17 -20 -31 -53 -37 -169 -163 -203 -220 -129 -218 -129 -502 -1 -720 75 -127 200 -239 334 -297 59 -27 241 -71 288 -71 41 0 196 33 257 55 91 32 175 89 261 174 72 71 94 102 133 181 102 209 102 419 0 630 -41 84 -58 107 -150 197 -76 74 -99 103 -88 107 9 3 150 6 314 6 274 0 304 2 352 20 77 29 151 97 190 178 29 59 33 76 33 147 -1 65 -5 91 -27 137 -34 72 -103 142 -176 176 l-57 27 -950 7 c-522 5 -2298 12 -3945 16 -3274 10 -3040 5 -3143 65 -55 33 -82 62 -106 117 -46 104 -36 214 31 350 71 144 54 130 1413 1182 l61 47 315 26 c172 13 1003 79 1844 145 3609 283 4202 330 4240 341 93 25 188 108 226 196 22 51 26 84 158 1168 45 363 95 770 111 905 17 135 44 355 60 490 16 135 64 522 105 860 41 338 81 641 87 672 11 52 10 65 -10 126 -39 121 -103 197 -204 242 -61 27 -92 29 -583 40 -242 6 -615 15 -830 20 -214 6 -761 19 -1215 30 -454 11 -1003 24 -1220 30 -217 5 -582 14 -810 20 -228 6 -593 15 -810 20 -760 19 -1218 30 -1615 40 -607 15 -1223 30 -1588 39 -188 5 -332 12 -338 18 -5 5 -215 529 -465 1164 -250 635 -466 1173 -480 1196 -29 50 -94 105 -155 132 -24 11 -125 33 -224 50 -99 17 -463 78 -810 136 -346 58 -720 122 -830 142 -259 46 -267 47 -343 19z m4486 -3405 c214 -6 265 -10 272 -21 15 -24 13 -1243 -2 -1258 -9 -9 -98 -12 -340 -12 -317 0 -328 1 -338 20 -22 41 -500 1262 -500 1277 0 16 81 16 908 -6z m1232 -31 c267 -6 495 -13 508 -16 l22 -4 -2 -618 -3 -617 -614 -3 c-485 -2 -616 0 -623 10 -4 7 -8 290 -8 629 0 479 3 618 13 628 9 9 39 11 117 7 58 -3 323 -11 590 -16z m1639 -40 c195 -5 358 -13 363 -18 4 -4 7 -276 6 -603 l-3 -594 -615 0 -615 0 -3 605 c-1 333 0 611 3 619 4 11 48 12 258 7 138 -4 411 -11 606 -16z m1296 -31 c286 -6 530 -15 543 -20 l22 -9 -2 -577 -3 -578 -620 0 -620 0 -3 585 c-1 322 0 591 3 598 6 15 28 15 680 1z m1525 -40 c272 -6 501 -12 508 -14 10 -4 12 -122 10 -567 l-3 -563 -609 -3 c-441 -1 -613 1 -622 9 -12 9 -14 110 -14 566 0 372 3 561 11 574 9 19 18 20 117 15 59 -4 330 -11 602 -17z m1492 -35 c163 -4 302 -10 308 -14 9 -5 5 -61 -14 -216 -14 -115 -44 -357 -66 -539 -23 -181 -44 -333 -49 -338 -4 -4 -209 -6 -457 -5 l-449 3 -3 550 c-1 303 0 556 3 564 5 12 41 13 218 8 116 -4 346 -10 509 -13z m-6914 -1356 c17 -17 17 -1119 0 -1136 -16 -16 -113 -16 -125 1 -22 27 -445 1117 -440 1132 6 13 43 15 280 15 199 0 276 -3 285 -12z m1490 -562 c2 -449 0 -571 -10 -578 -7 -4 -283 -8 -614 -8 -453 0 -603 3 -612 12 -17 17 -17 1119 0 1136 9 9 156 12 623 10 l610 -3 3 -569z m1482 555 c16 -31 14 -1102 -2 -1124 -12 -16 -58 -17 -623 -15 l-610 3 -3 565 c-1 311 0 571 3 578 3 9 136 12 614 12 593 0 611 -1 621 -19z m1478 7 c17 -17 17 -1119 0 -1136 -17 -17 -1209 -17 -1226 0 -9 9 -12 150 -12 573 0 309 3 565 7 568 3 4 279 7 613 7 458 0 609 -3 618 -12z m1487 -568 l0 -575 -610 -3 c-565 -2 -611 -1 -622 15 -17 22 -19 1093 -3 1124 11 19 26 19 623 17 l612 -3 0 -575z m1122 568 c6 -9 0 -91 -18 -238 -15 -124 -46 -376 -69 -560 -26 -213 -45 -337 -53 -342 -6 -4 -174 -7 -372 -5 l-360 2 -3 565 c-1 311 0 571 3 578 3 9 99 12 433 12 332 0 432 -3 439 -12z m-7055 -1390 c7 -18 -2 -39 -13 -32 -12 7 -12 44 0 44 5 0 11 -6 13 -12z m1486 -582 c1 -371 -1 -593 -8 -600 -7 -7 -704 -71 -980 -89 -24 -2 -31 13 -140 283 l-115 285 -3 344 c-1 190 0 351 2 358 5 11 117 13 623 11 l618 -3 3 -589z m1486 572 c3 -13 6 -251 6 -529 0 -389 -3 -509 -12 -521 -11 -13 -114 -24 -603 -62 -324 -25 -600 -46 -612 -46 l-23 0 0 583 c0 321 3 587 7 590 3 4 282 7 619 7 l612 0 6 -22z m1481 -463 l0 -480 -50 -7 c-110 -15 -1163 -91 -1178 -85 -16 6 -17 51 -17 525 0 285 3 522 7 525 3 4 284 6 622 5 l616 -3 0 -480z m1483 66 c1 -261 -1 -418 -8 -425 -5 -5 -281 -31 -612 -57 -556 -44 -604 -47 -615 -32 -10 13 -13 121 -13 459 0 243 3 450 6 458 6 15 67 16 623 14 l616 -3 3 -414z m954 407 c3 -7 -16 -181 -41 -387 -35 -288 -49 -376 -61 -382 -20 -11 -586 -53 -599 -44 -12 7 -16 807 -4 818 3 4 163 7 354 7 268 0 348 -3 351 -12z m-7517 -4612 c125 -33 230 -117 284 -228 85 -173 51 -369 -88 -502 -217 -207 -566 -146 -698 121 -32 65 -37 86 -41 162 -5 98 12 176 54 247 29 50 117 134 165 159 99 52 224 68 324 41z m7039 -29 c136 -64 223 -181 248 -330 29 -176 -72 -366 -236 -447 -223 -110 -485 -22 -593 198 -37 74 -38 79 -38 186 0 104 2 115 32 178 36 77 107 158 171 195 81 47 148 64 249 60 80 -4 101 -9 167 -40z" />
                    <path d="M4206 925 c-57 -20 -113 -80 -133 -141 -33 -105 12 -211 111 -259 48 -23 66 -27 120 -23 115 7 193 83 203 197 5 52 2 68 -21 114 -51 105 -168 152 -280 112z" />
                    <path d="M11170 927 c-57 -19 -125 -94 -140 -155 -24 -102 23 -202 116 -248 106 -52 227 -20 291 77 64 96 31 241 -69 302 -53 33 -140 44 -198 24z" />
                  </g>
                </svg>
              </h2>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
