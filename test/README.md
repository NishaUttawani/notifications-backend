# Notification Backend

A node.js and express.js server for user authentication and fetching notifications API

## Commands
1. Install dependencies

```bash
npm init
```

2. For starting the server, run the below command from the root folder.

```bash
npm run start
```
3. For running unit test cases, run the below command from the root folder.

```bash
npm run mocha
```

## Available APIs
1. ##### POST */users/signin*
 - Used for user login 
2. ##### GET */verifyLogin*
- Used for verifying or authenticating user
3. ##### GET */notifications*
- Used for getting notifications
4. ##### PUT */notifications/:id*
- Used for updating read flag for specific Notification (false -> true)

## Data Used

##### ./data/notifications.json 
- For notifications data

##### ./config.js
- For user data