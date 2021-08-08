package beans.users.base;

public interface Authorizable {
    public Role getRole();
    public boolean hasAuthority(Role role);
}
