# Zome API Documentation

## User

**Create User**
###### Request: 
```
Endpoint: /register
Arguments: { name: "username", avatar_url: "profile picture url" }
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: "user address" }",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Get User Profile**
###### Request: 
```
Endpoint: /get_member_profile
Arguments: { agent_address: "address of user"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: [{name:"user name", avatar_url: "profile picture url", agent_address:"user address"}]}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Follow User**
###### Request: 
```
Endpoint: /follow_user
Arguments: { agent_address: "address of user"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: true/false}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**UnFollow User**
###### Request: 
```
Endpoint: /unfollow_user
Arguments: { agent_address: "address of user"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: true/false}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Get User Following**
###### Request: 
```
Endpoint: /get_following
Arguments: { agent_address: "address of user"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: [{name:"user name", avatar_url: "profile picture url", agent_address:"user address"}]}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Get User Followers**
###### Request: 
```
Endpoint: /get_followed_by
Arguments: { agent_address: "address of user"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: [{name:"user name", avatar_url: "profile picture url", agent_address:"user address"}]}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```
