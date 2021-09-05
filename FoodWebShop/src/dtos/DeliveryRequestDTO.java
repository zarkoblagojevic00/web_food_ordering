package dtos;

import beans.restaurants.RequestStatus;
import beans.restaurants.requests.DeliveryRequest;

public class DeliveryRequestDTO {
    final private DelivererOverviewDTO deliverer;
    final private OrderOverviewDTO order;
    final private RequestStatus status;
    final private long id;

    public DeliveryRequestDTO(DelivererOverviewDTO deliverer, OrderOverviewDTO order, DeliveryRequest deliveryRequest) {
        this.deliverer = deliverer;
        this.order = order;
        this.status = deliveryRequest.getStatus();
        this.id = deliveryRequest.getId();

    }
}
