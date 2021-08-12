package repositories.json.repos;

import beans.users.roles.deliverer.Deliverer;
import repositories.interfaces.DelivererRepository;
import repositories.json.repos.base.UserJsonFileRepository;

public class DelivererJsonFileRepository extends UserJsonFileRepository<Deliverer> implements DelivererRepository {
    public DelivererJsonFileRepository() {
        super(Deliverer.class);
    }
}
