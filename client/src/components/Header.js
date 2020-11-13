import React from "react";
import { AiFillGithub, AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

function Header() {
  return (
    <header className="header flex items-center pt-4 text-gray-700">
      <AiFillGithub size={22} />
      <h2 className="text-xl ml-4">Github Mutual Finder</h2>
      <AiOutlineInfoCircle
        className="ml-3 cursor-pointer"
        data-tip="Not exactly a mutual finder, but finds intersection of users whom primary user follows and users who follow the secondary user"
        size={22}
      />
      <ReactTooltip />
    </header>
  );
}

export default Header;
