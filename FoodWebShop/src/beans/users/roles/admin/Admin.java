package beans.users.roles.admin;

import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;

public class Admin extends User {

    public Admin() {
        super(Role.ADMIN);
    }

    public Admin(Credentials credentials, PersonalData personalData) {
        super(credentials, personalData, Role.ADMIN);
    }


}
