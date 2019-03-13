const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/dna-src.dna.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

scenario.runTape('Can register a profile and retrieve', async (t, {alice}) => {
  const register_result = await alice.callSync('holoster', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
 //t.true(register_result.Ok.includes('alice'))

  const get_profile_result = await alice.callSync('holoster', 'get_member_profile', {agent_address: register_result.Ok})
  console.log(get_profile_result)

   // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})

scenario.runTape("Create_post & get_post by post_address", async(t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const addr = await alice.callSync("holoster", "create_post", {"content":"sample content"})
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

  const addr1 = await alice.callSync("holoster", "create_post", {"content":"sample content1"})
  const addr2 = await alice.callSync("holoster", "create_post", {"content":"sample content2"})
  const result = await alice.callSync("holoster", "get_user_posts", {"user_address": user.Ok})
  console.log(addr1)
  console.log(addr2)
  console.log(result)
  // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})
