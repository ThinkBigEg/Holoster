# Zome API Documentation

## Vote

**vote**
###### Request: 
```
Endpoint: /vote
Arguments: { target_address: "post/comment address", _state: "true/false" ,target: "post/comment" , _type: "up/down"  }
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Get Post/Comment Votes**
###### Request: 
```
Endpoint: /get_votes
Arguments: { target_address: "post/comment address" ,target: "post/comment" , _type: "up/down"  }
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