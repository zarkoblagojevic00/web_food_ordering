package services.auth;

import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;

public class AuthenticationData {
    private Credentials credentials;
    private PersonalData personalData;
    private Role role;

    public AuthenticationData() {

    }

    public Credentials getCredentials() {
        return credentials;
    }

    public PersonalData getPersonalData() {
        return personalData;
    }

    public Role getRole() {
        return role;
    }
}
