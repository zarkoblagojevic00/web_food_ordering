package repositories.json.repos;

import beans.users.roles.admin.Admin;
import repositories.interfaces.AdminRepository;
import repositories.json.repos.base.JsonFileRepository;

public class AdminJsonFileRepository extends JsonFileRepository<Admin> implements AdminRepository {
    public AdminJsonFileRepository() {
        super(Admin.class);
    }
}
