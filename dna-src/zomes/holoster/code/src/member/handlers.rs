use hdk::{
    AGENT_ADDRESS,
    utils::get_links_and_load_type,
    holochain_core_types::{
        entry::Entry,
        cas::content::Address,
    },
    error::{
        ZomeApiResult,
        ZomeApiError
    }
};

use crate::member::{Profile, Member};


pub fn handle_register(name: String , avatar_url: String) -> ZomeApiResult<Address> {
    let profile_entry = Entry::App("profile".into(),
                                   Profile{
                                       name,
                                       avatar_url,
                                       agent_address: AGENT_ADDRESS.to_string().into()
                                   }.into());
    let profile_address = hdk::commit_entry(&profile_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&profile_address,"profile")?;
    Ok(AGENT_ADDRESS.to_string().into())
}

pub fn handle_get_member_profile(agent_address: Address) -> ZomeApiResult<Profile> {
    get_links_and_load_type(&agent_address, "profile")?
        .iter()
        .next()
        .ok_or(ZomeApiError::Internal("Agent does not have a profile registered".into()))
        .map(|elem: Profile| {
            //elem.profile.clone()
        })
}
