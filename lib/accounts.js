//accounts.js

//additional security idea: have extra field for users that is set automatically when created through the page; require it for viewing other pages

/*
Accounts.config({
    forbidClientAccountCreation : true
});
*/

if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });
}
