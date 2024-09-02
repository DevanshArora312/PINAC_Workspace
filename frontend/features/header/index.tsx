import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LogoutBtn } from "./components/LogoutBtn";
import { NewChatBtn } from "./components/NewChatBtn";
import { LiveSearchButton } from "./components/LiveSearchButton";
import { SubPageContext } from "../../context/SubPage";
import styles from "./styles/index.module.css";

// Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface HeaderProps {
  title: string;
  subPage: boolean;
  clearChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subPage,
  clearChat,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const subPageContext = useContext(SubPageContext);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const [isActive,setActive] = useState<boolean>(false);
  //
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 460) {
        setIsMenuVisible(true);
      } else {
        setIsMenuVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //
  // Creating an event handler to close the dropdown menu by click elsewhere outside the menu
  useEffect(() => {
    const handleOutsideClicks = (e: MouseEvent) => {
      if (
        isDropdownActive &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClicks);

    return () => window.removeEventListener("mousedown", handleOutsideClicks);
  }, [isDropdownActive]);

  //
  // --------------------------------------------------- //
  return (
    <>
      <div
        className={`${styles.pageHeader} ${!subPage && styles.homePageHeader}`}
      >
        <div className={styles.leftSide}>
          {subPage ? (
            <div>
              <span className={styles.title}>{title}</span>
              <div className={styles.bottomLine}></div>
            </div>
          ) : (
            <div>
              <span
                className={
                  location.pathname == "/"
                    ? `${styles.homeTitle}`
                    : `${styles.title}`
                }
              >
                {title}
              </span>
              {location.pathname !== "/" ? (
                <>
                  <div className={styles.bottomLine}></div>
                </>
              ) : null}
            </div>
          )}
          {/* Render the sidebar button */}
          {isMenuVisible && !subPage && (
            <div className={styles.headerMenu} ref={dropdownMenuRef}>
              <div>
                <button
                  className={location.pathname == "/" ? `${styles.home}` : ""}
                  onClick={() => setIsDropdownActive(!isDropdownActive)}
                >
                  {isDropdownActive ? (
                    <IoIosArrowUp size={25} color="var(--text-color-iconic)" />
                  ) : (
                    <IoIosArrowDown
                      size={25}
                      color="var(--text-color-iconic)"
                    />
                  )}
                </button>
              </div>
              <div
                className={`${styles.dropdownMenu} ${
                  isDropdownActive ? `${styles.active}` : ""
                }`}
              >
                <ul>
                  {location.pathname !== "/profile" && (
                    <li onClick={() => navigate("/profile")}>Profile</li>
                  )}
                  {location.pathname !== "/" && (
                    <li onClick={() => navigate("/")}>Chat</li>
                  )}
                  {location.pathname !== "/about" && (
                    <li onClick={() => navigate("/about")}>About Us</li>
                  )}
                  {location.pathname !== "/settings" && (
                    <li onClick={() => navigate("/settings")}>Settings</li>
                  )}
                </ul>
              </div>
              {/* Special section at last for theme change */}
              <div
                className={`${styles.dropdownLastMenu} ${styles.dropdownMenu} ${
                  isDropdownActive ? `${styles.active}` : ""
                }`}
                style={{ marginTop: "130px" }}
              >
                <ul>
                  <li
                    style={{
                      alignItems: "center",
                      padding: "5px 10px",
                    }}
                  >
                    <ThemeToggle />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className={styles.rightSide}>
          {location.pathname == "/" && clearChat &&
            <LiveSearchButton isActive={isActive} setActive={setActive} />
          }
          {/* Render the new chat button only for Home Page */}
          {location.pathname == "/" && clearChat && (
            <NewChatBtn clearChat={clearChat} />
          )}
          {/* Render the logout button only for Profile Page */}
          {location.pathname == "/profile" ||
          (subPage && subPageContext?.subPage == "/profile") ? (
            <LogoutBtn changePage={navigate} />
          ) : null}
        </div>
      </div>
    </>
  );
};
