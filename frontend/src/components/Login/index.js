import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers } from "ethers";

let web3 = null;

export const Login = ({ onLoggedIn, onLoggedOut }) => {
  const [state, setState] = useState({
    signatureVal: "",
    loading: false,
  });

  const handleAuthenticate = ({ publicAddress, signature }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignMessage = ({ publicAddress }) => {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`${state.signatureVal}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  };

  const handleSignup = (publicAddress) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleChange = ({ target: { value } }) => {
    setState((prevState) => ({
      ...prevState,
      signatureVal: value,
    }));
  };

  const handleClick = async () => {
    if (!window.ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }
    if (!web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    if (!web3.eth.coinbase) {
      window.alert("Please check MetaMask Wallet.");
      return;
    }

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const publicAddress = await signer.getAddress();

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
    )
      .then((response) => response.json())
      .then((users) => (users.length ? users[0] : handleSignup(publicAddress)))
      .then(handleSignMessage)
      .then(handleAuthenticate)
      .then((res) => {
        if (res.accessToken) {
          onLoggedIn(res.accessToken);
        } else {
          setState({ loading: false });
          onLoggedOut();
        }
      })
      .catch((err) => {
        console.log(err, "err");

        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
  };

  const { loading } = state;
  return (
    <div>
      <input type="text" value={state.input} onChange={handleChange} />
      <p>some random string that will be signed</p>
      <button className="btn" onClick={handleClick}>
        {loading ? "Loading..." : "Login with MetaMask"}
      </button>
    </div>
  );
};
