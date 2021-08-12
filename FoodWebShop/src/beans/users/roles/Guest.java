package beans.users.roles;

import beans.users.base.Role;
import beans.users.base.User;

public class Guest extends User {
    public Guest() {
        super(Role.GUEST);
    }
}
