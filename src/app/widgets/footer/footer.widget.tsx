"use client";

import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

//component
/**
 * FooterComponent widget.
 */
export const FooterComponent = () => {
  //return
  return (
    <footer
      className="w-full h-auto flex justify-center flex-col items-center
        bg-gradient-to-t from-white-bg to-white-fg">
      {/* Divider line */}
      <div className="h-[60px] bg-white-bg w-full border-b-2 border-black"></div>

      {/* Footer content */}
      <div
        className="w-full max-w-[1240px] flex justify-between items-center
          py-[60px]">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <h2 className="text-rich-black">MindForge</h2>
          <span className="flex items-center gap-4">
            <a href="#" className="transition-all">
              <FaFacebook
                size={24}
                className="hover:fill-primary transition-all"
              />
            </a>
            <a href="#" className="transition-all">
              <FaInstagram
                size={24}
                className="hover:fill-primary transition-all"
              />
            </a>
            <a href="#" className="transition-all">
              <FaPhone
                size={22}
                className="hover:fill-primary transition-all"
              />
            </a>
          </span>
        </div>

        {/* Specialist column */}
        <div>
          <ul>
            <li>
              <h4>
                <a href="#" className="hover:text-primary transition-all">
                  Фахівцю
                </a>
              </h4>
            </li>
            <li>
              <h5>
                <a href="#" className="hover:text-primary transition-all">
                  Знайти замовлення
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href="#" className="hover:text-primary transition-all">
                  Виконані замовлення
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href="#" className="hover:text-primary transition-all">
                  Заповнити профіль
                </a>
              </h5>
            </li>
          </ul>
        </div>

        {/* Client column */}
        <div>
          <ul>
            <li>
              <h4>
                <a href="#" className="hover:text-primary transition-all">
                  Замовнику
                </a>
              </h4>
            </li>
            <li>
              <h5>
                <a href="#" className="hover:text-primary transition-all">
                  Створити замовлення
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href="#" className="hover:text-primary transition-all">
                  Мої замовлення
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href="#" className="hover:text-primary transition-all">
                  Знайти фахівця
                </a>
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
