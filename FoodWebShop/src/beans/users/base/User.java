package beans.users.base;

import beans.Entity;
import beans.users.roles.customer.UserActivityStatus;

import javax.security.auth.Subject;
import java.security.Principal;
import java.util.Date;

public class User extends Entity implements Identifiable, Authorizable, Principal {
    private Credentials credentials;
    private PersonalData personalData;
    private Role role;

    private UserActivityStatus activityStatus;

    public User() {

    }
    public User(Role role) {
        this.role = role;
        this.activityStatus = UserActivityStatus.OK;
    }

    public User(Credentials credentials, PersonalData personalData, Role role) {
        this.credentials = credentials;
        this.personalData = personalData;
        this.role = role;
        this.activityStatus = UserActivityStatus.OK;
    }

    public User(Role role, long id) {
        super(id);
        this.role = role;
    }

    public PersonalData getPersonalData() {
        return personalData;
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public void setPersonalData(PersonalData personalData) {
        this.personalData = personalData;
    }

    public UserActivityStatus getActivityStatus() {
        return activityStatus;
    }

    public void setActivityStatus(UserActivityStatus activityStatus) {
        this.activityStatus = activityStatus;
    }

    public String getUsername() {
        return credentials.getUsername();
    }

    public String getFirstName() {
        return personalData.getFirstName();
    }

    public String getLastName() {
        return personalData.getLastName();
    }

    public Gender getGender() {
        return personalData.getGender();
    }

    public Date getDateOfBirth() {
        return personalData.getDateOfBirth();
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

    // Principal - for security context
    @Override
    public String getName() {
        return credentials.getUsername();
    }

    @Override
    public boolean implies(Subject subject) {
        return Principal.super.implies(subject);
    }

    public void setCredentials(Credentials newCredentials) {
        this.credentials = newCredentials;
    }
}
