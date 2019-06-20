use hdk::{
    self,
    holochain_core_types::{
        cas::content::Address,
        entry::Entry,
    },
    error::{ZomeApiResult},
};

use crate::member;


pub fn get_user_profile_entry(agent_address: Address) -> ZomeApiResult<Address>{
    let user_profile= &(member::handlers::handle_get_member_profile(agent_address)?)[0];
    let profile_entry = Entry::App("profile".into() , user_profile.into());
    let entry_address = hdk::entry_address(&profile_entry)?;
    Ok(entry_address)
}
