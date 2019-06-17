const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/dna-src.dna.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const agentBob = Config.agent("bob")
const instanceAlice = Config.instance(agentAlice, dna)
const instanceBob = Config.instance(agentBob, dna)
const scenario = new Scenario([instanceAlice, instanceBob])

/*
scenario.runTape('Can register a profile and retrieve', async (t, {alice}) => {
  const register_result = await alice.callSync('holoster', 'register', {name: 'alice', avatar_url: ''})
  //console.log(register_result)
 //t.true(register_result.Ok.includes('alice'))

  const get_profile_result = await alice.callSync('holoster', 'get_member_profile', {agent_address: register_result.Ok})
  console.log(get_profile_result)

   // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})

scenario.runTape("Create_post & get_post by post_address", async(t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  let now = Math.floor(Date.now() / 1000)
  const addr = await alice.callSync("holoster", "create_post", {"content":"sample content" , "timestamp":now})
  const result = await alice.callSync("holoster", "get_post", {"post_address": addr.Ok})
  console.log(addr)
  console.log(result)
  // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})

scenario.runTape("create post and get all users posts", async(t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const user = await alice.callSync('holoster', 'register', {name: 'alice', avatar_url: ''})
  console.log(user)
  //t.true(register_result.Ok.includes('alice'))

  let now = Math.floor(Date.now() / 1000)
  const addr1 = await alice.callSync("holoster", "create_post", {"content":"sample content1" , "timestamp":now})

  let now2 = Math.floor(Date.now() / 1000)
  const addr2 = await alice.callSync("holoster", "create_post", {"content":"sample content2" , "timestamp":now2})

  const result = await alice.callSync("holoster", "get_user_posts", {"user_address": user.Ok})
  console.log(addr1)
  console.log(addr2)
  console.log(result)
  // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})

scenario.runTape('Register 2 profiles and retrieve them', async (t, {alice}) => {
  const register_address1 = await alice.callSync('holoster', 'register', {name: 'alice1', avatar_url: ''})
  const register_address2 = await alice.callSync('holoster', 'register', {name: 'alice2', avatar_url: ''})
  console.log(register_address1)

  const get_profile_result = await alice.callSync('holoster', 'get_member_profile', {agent_address: register_address1.Ok})
  console.log(get_profile_result)
})

scenario.runTape("Create_post & Comment & get_post_comment by post_address", async(t, { alice }) => {
  let now = Math.floor(Date.now() / 1000)
  const postAddr = await alice.callSync("holoster", "create_post", {"content":"This is a post" , "timestamp":now})
  console.log("postAddress : ", postAddr)

  let commentTimestamp = Math.floor(Date.now() / 1000);
  const commentAddr = await alice.callSync("holoster", "create_comment", {"content":"This is a comment" , "timestamp":commentTimestamp , "post_address":postAddr.Ok})
  console.log(commentAddr)

  const comments = await alice.callSync("holoster", "get_post_comments", {"post_address": postAddr.Ok})
  console.log(comments)

})

scenario.runTape("create post and update it", async(t, { alice }) => {

  const user = await alice.callSync('holoster', 'register', {name: 'alice', avatar_url: ''})
  console.log(user)
  //t.true(register_result.Ok.includes('alice'))

  let now = Math.floor(Date.now() / 1000)
  const addr1 = await alice.callSync("holoster", "create_post", {"content":"sample content1" , "timestamp":now})
  console.log(addr1)

  let now2 = Math.floor(Date.now() / 1000)
  const addr2 = await alice.callSync("holoster", "update_post", {"old_post_address": addr1.Ok , "content":"sample content2" , "timestamp":now2})

  const result = await alice.callSync("holoster", "get_user_posts", {"user_address": user.Ok})
  console.log(addr2)
  console.log(result)
  // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})

scenario.runTape("create post & delete it", async(t, { alice }) => {

    const userAddr = await alice.callSync('holoster', 'register', {name: 'alice', avatar_url: ''})
    console.log("User Address : ",userAddr)

    let now = Math.floor(Date.now() / 1000)
    const post1Addr = await alice.callSync("holoster", "create_post", {"content":"This is a post 1" , "timestamp":now})
    console.log("Post 1 : ",post1Addr)

    let now2 = Math.floor(Date.now() / 1000)
    const post2Addr = await alice.callSync("holoster", "create_post", {"content":"This is a post 2" , "timestamp":now2})
    console.log("Post 2 : ",post2Addr)

    const postsBefore = await alice.callSync("holoster", "get_user_posts", {"user_address": userAddr.Ok})
    console.log("All User Posts : ",postsBefore)

    const deletedPost = await alice.callSync("holoster", "delete_post", {"post_address": post1Addr.Ok})
    console.log(deletedPost)

    const postsAfter = await alice.callSync("holoster", "get_user_posts", {"user_address": userAddr.Ok})
    console.log("All User Posts : ",postsAfter)
})
/*
scenario.runTape("Create_post & Comment & update it then get_post_comment by post_address", async(t, { alice }) => {
    let now = Math.floor(Date.now() / 1000)
    const postAddr = await alice.callSync("holoster", "create_post", {"content":"This is a post" , "timestamp":now})
    console.log("postAddress : ", postAddr)

    let commentTimestamp = Math.floor(Date.now() / 1000);
    const commentAddr = await alice.callSync("holoster", "create_comment", {"content":"This is a comment" , "timestamp":commentTimestamp , "post_address":postAddr.Ok})
    console.log("CommentAddress : ",commentAddr)

    const commentsBefore = await alice.callSync("holoster", "get_post_comments", {"post_address": postAddr.Ok})
    console.log("All post Comments : ",commentsBefore)

    let commentTimestamp2 = Math.floor(Date.now() / 1000);
    const updatedCommentAddr = await alice.callSync("holoster", "update_comment", {"old_comment_address": commentAddr.Ok ,"content":"This is a new comment" , "timestamp":commentTimestamp2})
    console.log("Update Comment : ",updatedCommentAddr)

    const commentsAfter = await alice.callSync("holoster", "get_post_comments", {"post_address": postAddr.Ok})
    console.log("All post Comments after : ",commentsAfter)
})

*/

/*
scenario.runTape("Create_post & Comment & update it then get_post_comment by post_address", async(t, { alice }) => {
    let now = Math.floor(Date.now() / 1000)
    const postAddr = await alice.callSync("holoster", "create_post", {"content":"This is a post" , "timestamp":now})
    console.log("postAddress : ", postAddr)

    let commentTimestamp = Math.floor(Date.now() / 1000);
    const commentAddr = await alice.callSync("holoster", "create_comment", {"content":"This is a comment" , "timestamp":commentTimestamp , "post_address":postAddr.Ok})
    console.log("CommentAddress : ",commentAddr)

    const commentsBefore = await alice.callSync("holoster", "get_post_comments", {"post_address": postAddr.Ok})
    console.log("All post Comments : ",commentsBefore)

    const deleteComment = await alice.callSync("holoster", "delete_comment", {"post_address": postAddr.Ok,"comment_address": commentAddr.Ok })
    console.log("Delete Comment : ",deleteComment)

    const commentsAfter = await alice.callSync("holoster", "get_post_comments", {"post_address": postAddr.Ok})
    console.log("All post Comments after : ",commentsAfter)
})
*/
scenario.runTape('Can register alice & bob, alice follows bob, check following and followed_by ', async (t, {alice, bob}) => {
    const register_address1 = await alice.callSync('holoster', 'register', {name: 'alice', avatar_url: ''})
    console.log(register_address1.Ok)

    const register_address2 = await bob.callSync('holoster', 'register', {name: 'bob', avatar_url: ''})
    console.log(register_address2.Ok)

    const temp = await alice.callSync('holoster', 'follow_user', {agent_address: register_address2.Ok})
    console.log(temp)


    const get_following = await alice.callSync('holoster', 'get_following', {agent_address: register_address1.Ok})
    console.log(get_following)

    const get_followed_by = await bob.callSync('holoster', 'get_followed_by', {agent_address: register_address2.Ok})
    console.log(get_followed_by)
})