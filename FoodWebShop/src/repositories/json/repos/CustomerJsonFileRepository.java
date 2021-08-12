package repositories.json.repos;

import beans.users.roles.customer.Customer;
import repositories.interfaces.CustomerRepository;
import repositories.json.repos.base.UserJsonFileRepository;

public class CustomerJsonFileRepository extends UserJsonFileRepository<Customer> implements CustomerRepository {
    public CustomerJsonFileRepository() {
        super(Customer.class);
    }
}
