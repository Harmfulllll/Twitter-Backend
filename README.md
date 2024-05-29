# Twitter-Backend
Backend in node and express for twitter

## Table of Contents

- [Features](#features)
- [Prerequisites](#Prerequisites)
- [Installation](#installation)

## Features

### User Authentication and Authorization

Users can register and log in to the application. Passwords are hashed and stored securely using bcrypt. JSON Web Tokens (JWT) are used for maintaining user sessions and authorizing routes.

### Tweeting
Users can create, read, update, and delete tweets.

### Commenting
Users can comment on tweets.

### Liking
Users can like tweets and comments.

### Following
Users can follow and unfollow other users.

### Direct Messaging
Users can send direct messages to other users.

### Retweeting
Although not explicitly mentioned, the presence of a retweet.model.js file suggests that users might be able to retweet tweets.

### Profile Management
Users can likely update their profile information, although this hasn't been explicitly mentioned.

### Feed
Users can view a feed of tweets from users they follow.

### Security

The application uses various security measures such as HTTPS, input sanitization, JWT for authentication, CORS, Helmet for setting HTTP headers, and a Content Security Policy.

## Getting Started

### Prerequisites

<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="300"/>
<img src="https://expressjs.com/images/express-facebook-share.png" alt="Express.js" width="300"/>
<img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" alt="MongoDB" width="300"/>

### Installation

1.Clone the repository

`git clone https://github.com/Harmfulllll/Twitter-Backend.git `

2.Install NPM packages
`npm install`

3.Create a .env file in the root directory and add the necessary values according to the code

4.Start the server

### Contact
Tanvir Hassan Joy - [Github](https://github.com/Harmfulllll)


