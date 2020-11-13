import React from "react";

function MutualUserListItem(props) {
  const { user } = props;
  return (
    <li className="my-2 w-3/4 hover:shadow-lg cursor-pointer">
      <a
        href={user.html_url}
        className="shadow-md p-4 flex items-center space-x-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="img w-16 h-16  block self-center rounded-full shadow-md"
          src={user.avatar_url}
          alt={user.name || user.login}
        />
        <h3>@{user.login}</h3>
      </a>
    </li>
  );
}

export default MutualUserListItem;
