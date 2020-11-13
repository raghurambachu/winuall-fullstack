import React from "react";
// import { CgWorkAlt } from "react-icons/cg";
// import { GoLocation } from "react-icons/go";
// import { FaTwitter } from "react-icons/fa";

function DisplayUserDetails(props) {
  const { user } = props;
  return (
    <article className="relative mt-10">
      <span className="absolute inline-block w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 via-purple-400 to-purple-600 opacity-25 small-dot z-10 "></span>
      <div className="flex flex-col  text-gray-700">
        <img
          className="img w-40 h-40 block self-center rounded-full shadow-md  z-10"
          src={user.avatar_url}
          alt={user.name || user.login}
        />
        <div className="flex self-center mt-4">
          <h3 className="font-semibold ">
            {capitalize(user.name || user.login || "Anynomous")}
          </h3>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1  text-indigo-600 hover:text-gray-900"
          >
            ({user.login})
          </a>
        </div>
        {user.bio && <p className="text-center">{user.bio}</p>}

        {/* <div className="mt-8"></div>
        {user.company && (
          <div className=" flex items-center  space-x-2 pb-1">
            <CgWorkAlt className="-my-1" size={18} />
            <p>{user.company}</p>
          </div>
        )}
        {user.location && (
          <div className="flex items-center space-x-2 pb-1">
            <GoLocation className="-my-1" size={18} />
            <p>{user.location}</p>
          </div>
        )}
        {user.twitter_username && (
          <div className="flex items-center space-x-2 pb-1">
            <FaTwitter size={18} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${user.twitter_username}`}
              className="hover:text-gray-900 text-indigo-600 "
            >
              {user.twitter_username}
            </a>
          </div>
        )} */}
        {
          <div className="stats mt-4 flex justify-between font-semibold">
            <span>{user.followers} Followers</span>
            <span>{user.following} Following</span>
            <span>{user.public_repos} Repos</span>
          </div>
        }
      </div>
    </article>
  );
}

function capitalize(words) {
  return words
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default DisplayUserDetails;
