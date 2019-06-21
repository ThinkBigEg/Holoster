# Zome API Documentation

## Post

**Create Comment**
###### Request: 
```
Endpoint: /create_comment
Arguments: { content: "content of the comment", timestamp: "time of post creation" , post_address: "Address of the post to link the comment with"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{"Ok":"created comment address"}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Update Comment**
###### Request: 
``` 
Endpoint: /update_comment
Arguments: { old_comment_address: "comment address", content: "comment content", timestamp: "time of comment creation"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{"Ok":"updated comment address"}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Delete Comment**
###### Request: 
``` 
Endpoint: /delete_comment
Arguments: { comment_address: "Comment address"}
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

**Get Comment Address**
###### Request: 
``` 
Endpoint: /get_comment_address
Arguments: { comment_entry: "Comment entry"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{"Ok":"comment address"}",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
