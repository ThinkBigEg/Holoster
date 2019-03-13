#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;
use hdk::{
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    cas::content::Address,
    json::{JsonString},
    error::HolochainError,
};

mod member;

define_zome! {

	entries: [
        member::profile_definition()
	]

    genesis: || {
        {
    		Ok(())
        }
    }

	functions: [
		register: {
            inputs: |name: String, avatar_url: String|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: member::handlers::handle_register
        }
        get_member_profile: {
            inputs: |agent_address: Address|,
            outputs: |result: ZomeApiResult<Vec<member::Profile>>|,
            handler: member::handlers::handle_get_member_profile
        }
	]

    traits: {
        hc_public [
            register,
            get_member_profile
        ]
	}
 }


