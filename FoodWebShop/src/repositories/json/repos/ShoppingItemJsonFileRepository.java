package repositories.json.repos;

import beans.ecommerce.ShoppingItem;
import beans.restaurants.Product;
import repositories.interfaces.ProductJsonFileRepository;
import repositories.interfaces.ShoppingItemRepository;
import repositories.json.repos.base.JsonFileRepository;

import java.util.Collection;
import java.util.stream.Collectors;

public class ShoppingItemJsonFileRepository extends JsonFileRepository<ShoppingItem> implements ShoppingItemRepository {
    final private ProductJsonFileRepository productRepo;

    public ShoppingItemJsonFileRepository() {
        super(ShoppingItem.class);
        productRepo = new ProductJsonFileRepository();
    }

    @Override
    public Collection<ShoppingItem> getMultipleWithProducts(Collection<Long> ids) {
        return getMultiple(ids).stream()
                .map(this::createShoppingItemWithProduct)
                .collect(Collectors.toList());
    }

    private ShoppingItem createShoppingItemWithProduct(ShoppingItem shoppingItem) {
        Product product = productRepo.get(shoppingItem.getProduct().getId());
        return new ShoppingItem(product, shoppingItem);
    }

}
