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

**Get Post**
###### Request: 
``` 
Endpoint: /get_post
Arguments: { post_address: "post address"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok: {content: "content of the post", creator_hash: "Post Creator hash", timestamp: "time of post creation"} }",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Get User Posts**
###### Request: 
``` 
Endpoint: /get_user_posts
Arguments: { user_address: "agent address"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok:[{content: 'Post Content',
                    creator_hash:'post creator hash',
                    timestamp: "post creation timestamp" } ] }",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

**Get Post Comments**
###### Request: 
``` 
Endpoint: /get_post_comments
Arguments: { post_address: "post address"}
```

###### Response: 
```
Success: {
    jsonrpc: "2.0",
    result: "{ Ok:[{ content: 'This is a new comment',
                    creator_hash:'post creator hash',
                    timestamp: "comment timestamp" } ] }",
    id: "0"
}

Error: {Err:  {Error Type: 'Error Message'} }
```

