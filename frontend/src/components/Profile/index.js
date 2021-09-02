import React, { useState, useEffect } from "react";

export const Profile = ({ user, auth_token, onLoggedOut }) => {
  const { publicAddress, _id: id } = user;

  return (
    <div className="">
      <div className="pt">
        <span className="title">Id :</span> {id}
      </div>
      <div>
        <span className="title">My publicAddress :</span> {publicAddress}
      </div>
      <div className="token_div pt">
        {" "}
        <span className="title">Access Token :</span> {auth_token}{" "}
      </div>
      <button className="btn mt" onClick={onLoggedOut}>
        Logout
      </button>
    </div>
  );
};
