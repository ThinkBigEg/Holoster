use hdk::{
    AGENT_ADDRESS,
    holochain_core_types::{
        entry::Entry,
        cas::content::Address,
    },
    error::{
        ZomeApiResult,
    }
};

use crate::member::Profile;

pub fn handle_register(name: String , avatar_url: String) -> ZomeApiResult<Address> {
    let profile_entry = Entry::App("profile".into(),
                                   Profile{
                                       name,
                                       avatar_url,
                                       agent_address: AGENT_ADDRESS.to_string().into()
                                   }.into());
    let profile_address = hdk::commit_entry(&profile_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&profile_address,"profile")?;
    Ok(profile_address)
}

pub fn handle_get_member_profile(agent_address: Address) -> ZomeApiResult<Option<Entry>> {
    hdk::get_entry(&agent_address)
}
