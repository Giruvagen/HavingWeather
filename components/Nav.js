import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";

export class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="h-20 flex-initial">
        <ul className="flex flex-wrap text-3xl p-2 h-20 bg-gradient-to-r from-blue-300 via-blue-700 to-teal-400 shadow-lg">
          <li>
            <FontAwesomeIcon className="m-4 text-white" icon={faWind} />
          </li>
          <li className="m-2 text-white">This Blows</li>
        </ul>
      </div>
    );
  }
}

export default Nav;
