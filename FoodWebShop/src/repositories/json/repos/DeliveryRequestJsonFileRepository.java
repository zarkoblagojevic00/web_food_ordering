package repositories.json.repos;

import beans.restaurants.requests.DeliveryRequest;
import beans.users.roles.deliverer.Deliverer;
import repositories.interfaces.base.DeliveryRequestRepository;
import repositories.json.repos.base.JsonFileRepository;

import java.util.Collection;
import java.util.stream.Collectors;

public class DeliveryRequestJsonFileRepository extends JsonFileRepository<DeliveryRequest>
        implements DeliveryRequestRepository {

    public DeliveryRequestJsonFileRepository() {
        super(DeliveryRequest.class);
    }

    @Override
    public Collection<DeliveryRequest> getRequestsForOrder(long orderId) {
        return getAll().stream()
                .filter(deliveryRequest -> deliveryRequest.belongsToOrder(orderId))
                .collect(Collectors.toList());
    }
}
