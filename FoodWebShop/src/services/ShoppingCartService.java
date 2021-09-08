package services;

import beans.ecommerce.Order;
import beans.ecommerce.ShoppingCart;
import beans.ecommerce.ShoppingItem;
import beans.users.roles.customer.Customer;
import beans.users.roles.customer.CustomerPointsCalculator;
import beans.users.roles.customer.CustomerTypeManager;
import repositories.interfaces.CustomerRepository;
import repositories.interfaces.OrderRepository;
import repositories.interfaces.ShoppingCartRepository;
import repositories.interfaces.ShoppingItemRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ShoppingCartService {
    final private ShoppingCartRepository shoppingCartRepo;
    final private ShoppingItemRepository shoppingItemRepo;
    final private CustomerRepository customerRepo;
    final private OrderRepository orderRepo;
    final private CustomerTypeManager typeManager;
    final private CustomerPointsCalculator pointsCalculator;

    @Inject
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepo,
                               ShoppingItemRepository shoppingItemRepo,
                               CustomerRepository customerRepo,
                               OrderRepository orderRepo){
        this.shoppingCartRepo = shoppingCartRepo;
        this.shoppingItemRepo = shoppingItemRepo;
        this.customerRepo = customerRepo;
        this.orderRepo = orderRepo;
        this.pointsCalculator = new CustomerPointsCalculator();
        this.typeManager = new CustomerTypeManager();
    }

    public void createShoppingCartForUser(long id) {
        shoppingCartRepo.createShoppingCartForUser(id);
    }

    public void destroyShoppingCart(long userId) {
        ShoppingCart cart = shoppingCartRepo.findUsersShoppingCart(userId);
        shoppingCartRepo.delete(cart.getId());
    }

    public void addShoppingItemToCart(long customerId, ShoppingItem shoppingItem) {
        ShoppingCart usersCart = getFullShoppingCartForCustomer(customerId);

        ShoppingItem itemWithProduct = usersCart.getItemWithProduct(shoppingItem.getProduct().getId());
        if (itemWithProduct != null) {
            itemWithProduct.setQuantity(shoppingItem.getQuantity());
            shoppingItemRepo.update(itemWithProduct);
        } else {
            ShoppingItem saved = shoppingItemRepo.save(shoppingItem);
            usersCart.add(shoppingItemRepo.getItemWithProduct(saved.getId()));
        }

        usersCart.setTotalPrice(getDiscountedPrice(customerId, usersCart.getPrice()));

        shoppingCartRepo.update(usersCart);
    }

    public ShoppingCart getCartForCustomer(long customerId) {
        return getFullShoppingCartForCustomer(customerId);
    }

    public void removeItemFromCart(long customerId, long itemId) {
        ShoppingCart usersCart = getFullShoppingCartForCustomer(customerId);
        usersCart.remove(itemId);
        shoppingItemRepo.delete(itemId);
        usersCart.setTotalPrice(getDiscountedPrice(customerId, usersCart.getPrice()));
        shoppingCartRepo.update(usersCart);
    }

    public void createOrderForCart(long customerId) {
        ShoppingCart usersCart = getFullShoppingCartForCustomer(customerId);
        addCustomerPoints(customerId, usersCart.getPrice());
        orderRepo.saveAll(createOrders(usersCart, customerId));
        shoppingCartRepo.delete(usersCart.getId());
        shoppingCartRepo.save(new ShoppingCart(customerId));
    }

    private void addCustomerPoints(long customerId, double cartPrice) {
        Customer customer = customerRepo.get(customerId);
        customer.addPointsEarned(pointsCalculator.getPointsEarned(cartPrice));
        typeManager.setCustomerTypeByPoints(customer);
        customerRepo.update(customer);
    }

    private ShoppingCart getFullShoppingCartForCustomer(long customerId) {
        ShoppingCart usersCart = shoppingCartRepo.findUsersShoppingCart(customerId);
        Collection<ShoppingItem> fullShoppingItems = shoppingItemRepo.getMultipleWithProducts(usersCart.getItemsIds());
        usersCart.setItems(fullShoppingItems);
        return usersCart;
    }

    private double getDiscountedPrice(long customerId, double originalPrice) {
        Customer customer = customerRepo.get(customerId);
        return typeManager.calculateDiscount(customer.getCustomerTypeName(), originalPrice);
    }

    private Collection<Order> createOrders(ShoppingCart usersCart, long customerId) {
        Map<Long, List<ShoppingItem>> itemsGroupedByRestaurant = usersCart.getItems().stream()
                .collect(Collectors.groupingBy(ShoppingItem::getRestaurantId));

        return itemsGroupedByRestaurant.keySet().stream()
                .map(restaurantId -> createOrder(customerId, restaurantId, itemsGroupedByRestaurant.get(restaurantId)))
                .collect(Collectors.toList());
    }

    private Order createOrder(Long customerId, long restaurantId, List<ShoppingItem> shoppingItems) {
        double fullPriceForOrder = shoppingItems.stream().mapToDouble(ShoppingItem::getPrice).sum();
        double discountedPrice = getDiscountedPrice(customerId, fullPriceForOrder);
        return new Order(restaurantId, customerId, shoppingItems, discountedPrice);
    }
}
