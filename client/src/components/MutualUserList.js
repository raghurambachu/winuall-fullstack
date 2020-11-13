import React from "react";
import MutualUserListItem from "./MutualUserListItem";

function MutualUserList(props) {
  return (
    <ul className="max-h-70 mt-8 flex flex-col items-center ">
      {props.mutualUsers.map((user) => (
        <MutualUserListItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

export default MutualUserList;
