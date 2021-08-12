package repositories.json.repos;

import beans.users.roles.manager.Manager;
import repositories.interfaces.ManagerRepository;
import repositories.json.repos.base.UserJsonFileRepository;

public class ManagerJsonFileRepository extends UserJsonFileRepository<Manager> implements ManagerRepository {
    public ManagerJsonFileRepository() {
        super(Manager.class);
    }
}
