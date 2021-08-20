package repositories.json.repos;

import beans.ecommerce.Order;
import repositories.interfaces.OrderRepository;
import repositories.json.repos.base.JsonFileRepository;

public class OrderJsonFileRepository extends JsonFileRepository<Order> implements OrderRepository {
    public OrderJsonFileRepository() {
        super(Order.class);
    }
}
