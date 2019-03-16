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
mod post;

define_zome! {

	entries: [
        member::profile_definition(),
        post::post_definition()
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
        create_post: {
            inputs: |content: String , timestamp: u32|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: post::handlers::handle_create_post
        }
        get_post: {
            inputs: |post_address: Address|,
            outputs: |result: ZomeApiResult<Option<Entry>>|,
            handler: post::handlers::handle_get_post
        }
        get_user_posts: {
            inputs: |user_address: Address|,
            outputs: |result: ZomeApiResult<Vec<post::Post>>|,
            handler: post::handlers::handle_get_user_posts
        }
	]

    traits: {
        hc_public [
            register,
            get_member_profile,
            create_post,
            get_post,
            get_user_posts
        ]
	}
 }


