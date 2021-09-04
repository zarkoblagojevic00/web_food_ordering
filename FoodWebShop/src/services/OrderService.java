package services;

import beans.Entity;
import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
import beans.ecommerce.ShoppingItem;
import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;
import beans.users.roles.deliverer.Deliverer;
import dtos.CustomerOverviewDTO;
import dtos.ManagerOrderOverviewDTO;
import dtos.OrderOverviewDTO;
import repositories.interfaces.*;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class OrderService {
    final private OrderRepository orderRepo;
    final private CustomerRepository customerRepo;
    final private RestaurantRepository restaurantRepo;
    final private ShoppingItemRepository shoppingItemRepo;
    final private DelivererRepository delivererRepo;

    @Inject
    public OrderService(OrderRepository orderRepo,
                        CustomerRepository customerRepo,
                        RestaurantRepository restaurantRepo,
                        ShoppingItemRepository shoppingItemRepo,
                        DelivererRepository delivererRepo) {
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
        this.restaurantRepo = restaurantRepo;
        this.shoppingItemRepo = shoppingItemRepo;
        this.delivererRepo = delivererRepo;
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

    public ManagerOrderOverviewDTO getManagerOrderOverview(long orderId) {
        Order order = orderRepo.get(orderId);
        OrderOverviewDTO orderDto = createOrderOverviewDTO(order);
        Collection<ShoppingItem> items = shoppingItemRepo.getMultipleWithProducts(order.getItemsIds());
        // TODO: Should get DeliveryRequests also
        return new ManagerOrderOverviewDTO(orderDto, items);
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
}
