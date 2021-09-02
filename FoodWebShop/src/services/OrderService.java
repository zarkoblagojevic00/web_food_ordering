package services;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
import beans.ecommerce.ShoppingItem;
import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;
import dtos.ManagerOrderOverviewDTO;
import dtos.OrderOverviewDTO;
import repositories.interfaces.CustomerRepository;
import repositories.interfaces.OrderRepository;
import repositories.interfaces.RestaurantRepository;
import repositories.interfaces.ShoppingItemRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class OrderService {
    final private OrderRepository orderRepo;
    final private CustomerRepository customerRepo;
    final private RestaurantRepository restaurantRepo;
    final private ShoppingItemRepository shoppingItemRepo;

    @Inject
    public OrderService(OrderRepository orderRepo,
                        CustomerRepository customerRepo,
                        RestaurantRepository restaurantRepo,
                        ShoppingItemRepository shoppingItemRepo) {
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
        this.restaurantRepo = restaurantRepo;
        this.shoppingItemRepo = shoppingItemRepo;
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
}
