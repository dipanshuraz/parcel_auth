<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <br/>
  
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
     <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
     <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#developers">Developers</a></li>

  </ol>
</details>

## About The Project

<br/>

`Create an authentication system.

- The page should first allow you to connect to a wallet (you can use third party tools to achieve this).
- Once you have a connected wallet it should allow you to sign a text MESSAGE (this can be any random string).
- This signature will be sent to the auth API. You will create a mock "API" that's basically a function that does the following:
  It will take (signature, wallet address) as input.
  It will return (isAuthenticated: true, auth_token: "random_string") as output if the authentication succeeds.
  It will return (isAuthenticated: false) otherwise.
  authentication is considered a success if you can recover the wallet address from the signature and the MESSAGE, and if the recovered address is the same as the wallet address received as a parameter.

- Configure axios to set the "Authorization" header with the auth_token along with every request.
  Alternatively, you can create a function that mimics the fetch API but automatically adds the Authorization header
  `

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- ```sh
  npm install npm@latest -g
  ```
- ```sh
  npm install --global yarn
  ```

### Installation

1. Install NPM packages in both

   ```sh
   yarn
   ```

2. Add the `.env` file in the root for

### backend

NODE_ENV=development
</br>
APP_NAME="APP SERVER"
</br>
APP_DOMAIN=''
</br>
PORT=5000
</br>
APP_PORT=5001
</br>
CLIENT_URL=''
</br>
APP_SECRET=''
</br>
DATABASE_CLOUD=''
</br>
DATABASE_LOCAL=''

### frontend

REACT_APP_BACKEND_URL=''

3. Run the backend server

```sh
yarn dev
```

4. Run the frontend app

```sh
yarn start
```

### Tech Stack

- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

- [Metamask](https://metamask.io/)
- [Ethers](https://docs.ethers.io/v5/)
- [Web3](https://web3js.readthedocs.io/en/v1.5.0/)
- [Onboard](https://docs.blocknative.com/onboard)

### For Security

<br/>

1. <b>Helmet</b> - Helmet. js is a useful Node. js module that helps you secure HTTP headers returned by your Express apps. HTTP headers are an important part of the HTTP protocol, but are generally transparent from the end-user perspective.
   <br/>
   <br/>
2. <b>Sanitize</b> - HTTP request isn't only about making sure that the data is in the right format, but also that it is free of noise and sanitizes inputs against query selector injection attacks.
   <br/>
   <br/>

3. <b>XXS</b> - Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist. sanitize any data in req.body, req.query, and req.params.

  <br/>

## Developers

- [Deepanshu Prajapati](https://github.com/dipanshuraz)
