const { Config, Container, Scenario } = require('@holochain/holochain-nodejs')
Scenario.setTape(require('tape'))
const dnaPath = "dist/dna-src.dna.json"
const dna = Config.dna(dnaPath, 'happs')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])


scenario.runTape('Register 2 profiles and retrieve them', async (t, {alice}) => {
  const register_address1 = await alice.callSync('holoster', 'register', {name: 'alice1', avatar_url: ''})
  const register_address2 = await alice.callSync('holoster', 'register', {name: 'alice2', avatar_url: ''})
  console.log(register_address1)

  const get_profile_result = await alice.callSync('holoster', 'get_member_profile', {agent_address: register_address1.Ok})
  console.log(get_profile_result)
})
