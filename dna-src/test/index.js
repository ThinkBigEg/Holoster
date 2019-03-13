const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/dna-src.dna.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

scenario.runTape("description of example test", async(t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const addr = await alice.callSync("holoster", "create_post", {"content":"sample content"})
  const result = await alice.callSync("holoster", "get_post", {"post_address": addr.Ok})
  console.log(addr)
  console.log(result)
  // check for equality of the actual and expected results
  //t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})
