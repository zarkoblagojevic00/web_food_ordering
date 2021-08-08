package beans.users.base;

import beans.Entity;

public abstract class User extends Entity implements Identifiable, Authorizable {
    private Credentials credentials;
    private PersonalData personalData;
    final private Role role;

    public User(Role role) {
        this.role = role;
    }

    public User(Credentials credentials, PersonalData personalData, Role role) {
        this.credentials = credentials;
        this.personalData = personalData;
        this.role = role;
    }

    @Override
    public boolean isMyIdentity(Credentials credentials) {
        return this.credentials.isMyIdentity(credentials);
    }

    @Override
    public Role getRole() {
        return this.role;
    }

    @Override
    public boolean hasAuthority(Role role) {
        return this.role.equals(role);
    }
}
