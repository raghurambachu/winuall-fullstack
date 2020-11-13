import React, { useState } from "react";
import githubUsernameRegex from "github-username-regex";

function GithubUserForm(props) {
  const { title, dispatch } = props;
  const displayText = title
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const [formState, setFormState] = useState({ username: "", error: "" });

  function handleChange({ target: { value } }) {
    if (!githubUsernameRegex.test(value))
      setFormState((ps) => ({
        ...ps,
        username: value,
        error: "Enter valid username",
      }));
    else setFormState((ps) => ({ ...ps, username: value, error: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/github/${formState.username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === "failed") {
          setFormState((ps) => ({
            ...ps,
            username: "",
            error: "",
          }));
          dispatch({
            type: "SET_NOTIFICATION",
            payload: {
              userType: title,
              notification: "User does'nt exist or Internal Server Error",
            },
          });
        } else {
          setFormState((ps) => ({ ...ps, username: "", error: "" }));

          dispatch({
            type: "SET_USER",
            payload: { userType: title, user: res?.data },
          });
        }
      });
  }

  return (
    <div className=" mt-8 mb-4 relative z-10">
      <form onSubmit={handleSubmit}>
        {/* Rather than label it should be h4 or so */}
        <label className="text-lg font-semibold" htmlFor={`${title}`}>
          {displayText}
        </label>
        <div className="grid-cols-4 grid mt-1">
          <input
            onChange={handleChange}
            type="text"
            className="px-2 block col-span-3 py-2  rounded-l-sm shadow-md focus:outline-none"
            placeholder={`Enter ${title.split("-").join(" ")}`}
            value={formState.username}
          />

          <button className="bg-blue-400 shadow-md rounded-r-sm hover:bg-blue-500 text-blue-100 font-bold text-sm col-span-1">
            Show
          </button>
        </div>
        {formState.error && (
          <small className="text-red-500 text-semibold">
            {formState.error}
          </small>
        )}
      </form>
    </div>
  );
}

export default GithubUserForm;
