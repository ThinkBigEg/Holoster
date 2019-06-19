# Zome API Documentation

## Post

**Create Post**
###### Request: 
```
Endpoint: /create_post
Arguments: { content: "content of the post", timestamp: "time of post creation"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{"Ok":"created post address"}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Update Post**
###### Request: 
``` 
Endpoint: /update_post
Arguments: { old_post_address: "post address", content: "post content", timestamp: "time of post creation"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{"Ok":"updated post address"}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Delete Post**
###### Request: 
``` 
Endpoint: /delete_post
Arguments: { post_address: "post address"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{Ok:{}}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

