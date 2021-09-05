package services;

import beans.Entity;
import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
import beans.ecommerce.ShoppingItem;
import beans.restaurants.Restaurant;
import beans.restaurants.requests.DeliveryRequest;
import beans.users.roles.customer.Customer;
import beans.users.roles.deliverer.Deliverer;
import dtos.CustomerOverviewDTO;
import dtos.DeliveryRequestDTO;
import dtos.OrderDetailsDTO;
import dtos.OrderOverviewDTO;
import repositories.interfaces.*;
import repositories.interfaces.base.DeliveryRequestRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class OrderService {
    final private OrderRepository orderRepo;
    final private CustomerRepository customerRepo;
    final private RestaurantRepository restaurantRepo;
    final private ShoppingItemRepository shoppingItemRepo;
    final private DelivererRepository delivererRepo;
    final private DeliveryRequestRepository deliveryRequestRepo;
    final private DelivererService delivererService;

    @Inject
    public OrderService(OrderRepository orderRepo,
                        CustomerRepository customerRepo,
                        RestaurantRepository restaurantRepo,
                        ShoppingItemRepository shoppingItemRepo,
                        DelivererRepository delivererRepo,
                        DeliveryRequestRepository deliveryRequestRepo,
                        DelivererService delivererService) {
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
        this.restaurantRepo = restaurantRepo;
        this.shoppingItemRepo = shoppingItemRepo;
        this.delivererRepo = delivererRepo;
        this.deliveryRequestRepo = deliveryRequestRepo;
        this.delivererService = delivererService;
    }

    public Collection<OrderOverviewDTO> getOrdersForRestaurant(long restaurantId) {
        return orderRepo.getOrdersForRestaurant(restaurantId).stream()
                .map(this::createOrderOverviewDTO)
                .collect(Collectors.toList());
    }

    private OrderOverviewDTO createOrderOverviewDTO(Order order) {
        final Customer customer = customerRepo.get(order.getCustomer().getId());
        final Restaurant restaurant = restaurantRepo.get(order.getRestaurant().getId());
        return new OrderOverviewDTO(order, customer, restaurant);
    }

    public Order postOrder(long restaurantId, Order newOrder) {
        Collection<ShoppingItem> items = shoppingItemRepo.saveAll(newOrder.getItems());
        return orderRepo.save(new Order(restaurantId, newOrder, items));
    }

    public OrderDetailsDTO getOrderDetails(long orderId) {
        Order order = orderRepo.get(orderId);
        OrderOverviewDTO orderDto = createOrderOverviewDTO(order);
        Collection<ShoppingItem> items = shoppingItemRepo.getMultipleWithProducts(order.getItemsIds());
        Collection<DeliveryRequestDTO> deliveryRequestsForOrder = getDeliveryRequestsForOrder(orderId);
        return new OrderDetailsDTO(orderDto, items, deliveryRequestsForOrder);
    }

    public Order changeOrderStatus(long orderId, OrderStatus status) {
        Order existing = orderRepo.get(orderId);
        existing.setStatus(status);
        return orderRepo.update(existing);
    }

    public Collection<CustomerOverviewDTO> getRestaurantCustomersOverview(long restaurantId) {
        Collection<Long> customerIds = orderRepo.getOrdersForRestaurant(restaurantId).stream()
                .map(Order::getCustomer)
                .map(Entity::getId)
                .distinct()
                .collect(Collectors.toList());
        return customerRepo.getMultiple(customerIds).stream()
                .map(CustomerOverviewDTO::new)
                .collect(Collectors.toList());
    }

    public Collection<OrderOverviewDTO> getOrdersForCustomer(long customerId) {
        return orderRepo.getOrdersForCustomer(customerId).stream()
                .map(this::createOrderOverviewDTO)
                .collect(Collectors.toList());
    }

    public Collection<OrderOverviewDTO> getOrdersForDeliverer(long id) {
        Deliverer deliverer = delivererRepo.get(id);
        return orderRepo.getMultiple(deliverer.getOrdersIds()).stream()
                .map(this::createOrderOverviewDTO)
                .collect(Collectors.toList());
    }

    public Collection<OrderOverviewDTO> getOrdersByStatus(OrderStatus status) {
        return orderRepo.getOrdersByStatus(status).stream()
                .map(this::createOrderOverviewDTO)
                .collect(Collectors.toList());
    }

    public Collection<OrderOverviewDTO> getAvailableOrdersForDeliverer(long id) {
        Collection<Long> alreadyRequestedOrdersIds = getAlreadyRequestedOrdersForDeliverer(id);
        return orderRepo.getOrdersByStatus(OrderStatus.WAITING_ON_DELIVERY).stream()
                .filter(order -> !alreadyRequestedOrdersIds.contains(order.getId()))
                .map(this::createOrderOverviewDTO)
                .collect(Collectors.toList());
    }

    private Collection<Long> getAlreadyRequestedOrdersForDeliverer(long id) {
        Collection<Long> deliveryRequestIds = delivererRepo.get(id).getDeliveryRequestIds();
        return deliveryRequestRepo.getMultiple(deliveryRequestIds).stream()
                .map(deliveryRequest -> deliveryRequest.getOrder().getId())
                .collect(Collectors.toList());
    }

    public DeliveryRequest addDeliveryRequest(DeliveryRequest newDeliveryRequest) {
        DeliveryRequest saved = deliveryRequestRepo.save(newDeliveryRequest);
        Deliverer deliverer = delivererRepo.get(saved.getDeliverer().getId());
        deliverer.addRequest(saved);
        delivererRepo.update(deliverer);
        return saved;
    }

    public Collection<DeliveryRequestDTO> getDeliveryRequestsForOrder(long orderId) {
        return deliveryRequestRepo.getRequestsForOrder(orderId).stream()
                .map(this::createDeliveryRequestDTO)
                .collect(Collectors.toList());
    }

    private DeliveryRequestDTO createDeliveryRequestDTO(DeliveryRequest deliveryRequest) {
        Deliverer deliverer = delivererRepo.get(deliveryRequest.getDeliverer().getId());
        Order order = orderRepo.get(deliveryRequest.getOrder().getId());
        return new DeliveryRequestDTO(
                delivererService.createDelivererOverviewDTO(deliverer),
                createOrderOverviewDTO(order),
                deliveryRequest);
    }


    public DeliveryRequest acceptDeliveryRequest(long deliveryRequestid) {
        DeliveryRequest deliveryRequest = deliveryRequestRepo.get(deliveryRequestid);

        Order order = orderRepo.get(deliveryRequest.getOrder().getId());
        order.setStatus(OrderStatus.IN_TRANSPORT);
        orderRepo.update(order);

        Deliverer deliverer = delivererRepo.get(deliveryRequest.getDeliverer().getId());
        deliverer.addOrder(order);
        delivererRepo.update(deliverer);

        deliveryRequestRepo.getRequestsForOrder(order.getId())
                .forEach(this::rejectDeliveryRequest);
        deliveryRequest.approve();
        return deliveryRequestRepo.update(deliveryRequest);
    }

    private void rejectDeliveryRequest(DeliveryRequest deliveryRequest) {
        deliveryRequest.reject();
        deliveryRequestRepo.update(deliveryRequest);
    }
}
