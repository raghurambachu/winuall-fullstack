import React from "react";
import Header from "./Header";
import Main from "./Main";

class App extends React.Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-200 bg-gradient-to-bl from-gray-100 via-gray-200 to-blue-200 relative">
        <div className="absolute w-32 h-32 rounded-full bg-white bottom-0 left-0 opacity-25 m-8"></div>
        <div className="absolute w-32 h-32 rounded-full bg-white bottom-0 left-0 opacity-25 m-16"></div>
        <div className="absolute w-32 h-32 rounded-full bg-blue-200 top-0 right-0 opacity-25 m-8 z-0"></div>
        <div className="absolute w-32 h-32 rounded-full bg-blue-200 top-0 right-0 opacity-25 m-16 z-0"></div>
        <div className="container mx-auto px-5 lg:px-0">
          <Header />
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
