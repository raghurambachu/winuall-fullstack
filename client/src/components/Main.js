import React, { useReducer } from "react";
import { FiRefreshCw } from "react-icons/fi";
import ReactTooltip from "react-tooltip";

import GithubUserForm from "./GithubUserForm";
import DisplayUserDetails from "./DisplayUserDetails";
import MutualUserList from "./MutualUserList";

const initialState = {
  primaryUser: null,
  secondaryUser: null,
  mutualUsers: [],
  notification: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      const { userType, notification } = action.payload;
      if (userType === "primaryUser") {
        return { ...state, notification, primaryUser: null };
      } else if (userType === "secondaryUser") {
        return { ...state, notification, secondaryUser: null };
      } else {
        return { ...state, notification };
      }
    }

    case "SET_USER": {
      const { userType, user } = action.payload;
      if (userType === "primary-user") {
        return { ...state, primaryUser: user, notification: "" };
      } else return { ...state, secondaryUser: user, notification: "" };
    }

    case "SET_MUTUAL_USERS": {
      const { mutualUsers } = action.payload;
      return { ...state, mutualUsers };
    }
    case "RESET_USERS": {
      // Have'nt returned intial state, to ensure it's pure function
      return {
        primaryUser: null,
        secondaryUser: null,
        mutualUsers: [],
        notification: "",
      };
    }

    default:
      return state;
  }
}

function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMutualButtonClick(e) {
    fetch(
      `/github/mutual?primaryUser=${state.primaryUser.login}&secondaryUser=${state.secondaryUser.login}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.intersectionArr && res.intersectionArr.length) {
          dispatch({
            type: "SET_MUTUAL_USERS",
            payload: { mutualUsers: res.intersectionArr },
          });
        } else {
          dispatch({
            type: "SET_NOTIFICATION",
            payload: {
              userType: "none",
              notification:
                "No mutual user, between users to whom primary user follows and users who follow the secondary user",
            },
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            userType: "none",
            notification: "There has been some error. Please try again later.",
          },
        })
      );
  }

  return (
    <main className="lg:grid lg:grid-cols-3 text-gray-800  flex flex-col  ">
      {state.notification && (
        <div className="absolute transform text-gray-800 notification">
          {state.notification}
        </div>
      )}
      <div className="col-span-1 order-1">
        <GithubUserForm dispatch={dispatch} title="primary-user" />
        {state.primaryUser && <DisplayUserDetails user={state.primaryUser} />}
      </div>
      <div className="col-span-1 text-center order-3 lg-order-2 relative z-10">
        {
          <div className="flex space-x-8 justify-center">
            <button
              className={` mt-16 rounded-sm shadow-sm px-4 py-2  focus:outline-none ${
                state.primaryUser && state.secondaryUser
                  ? "cursor-pointer bg-green-500 text-green-100 hover:bg-green-600 "
                  : "cursor-not-allowed bg-gray-600 text-gray-100"
              } `}
              onClick={
                state.primaryUser &&
                state.secondaryUser &&
                handleMutualButtonClick
              }
            >
              Mutual Followers
            </button>
            <FiRefreshCw
              data-tip="Refresh"
              onClick={() => dispatch({ type: "RESET_USERS" })}
              className="mt-18 cursor-pointer text-gray-600 hover:text-gray-900 "
              size={25}
            />
            <ReactTooltip />
          </div>
        }
        <MutualUserList mutualUsers={state.mutualUsers} />
      </div>
      <div className="col-span-1 order-2 lg:order-3">
        <GithubUserForm dispatch={dispatch} title="secondary-user" />
        {state.secondaryUser && (
          <DisplayUserDetails user={state.secondaryUser} />
        )}
      </div>
    </main>
  );
}

export default Main;
