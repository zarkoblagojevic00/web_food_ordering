package repositories.json.repos;

import beans.users.roles.admin.Admin;
import repositories.interfaces.AdminRepository;
import repositories.json.repos.base.UserJsonFileRepository;

public class AdminJsonFileRepository extends UserJsonFileRepository<Admin> implements AdminRepository {
    public AdminJsonFileRepository() {
        super(Admin.class);
    }
}
