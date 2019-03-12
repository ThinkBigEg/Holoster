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

})
