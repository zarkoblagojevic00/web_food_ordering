package repositories.interfaces;

import beans.restaurants.Product;
import repositories.json.repos.base.JsonFileRepository;
import services.exceptions.FieldNotUniqueException;

import java.util.Collection;
import java.util.stream.Collectors;

public class ProductJsonFileRepository extends JsonFileRepository<Product> implements ProductRepository {

    public ProductJsonFileRepository() {
        super(Product.class);
    }

    @Override
    public Collection<Product> getProductsForRestaurant(long restaurantId) {
        return getAll().stream()
                .filter(product -> product.belongsTo(restaurantId))
                .collect(Collectors.toList());
    }

    @Override
    public void checkUniqueName(String name) throws FieldNotUniqueException {
        boolean anyNameMatches = getAll().stream()
                .anyMatch(product -> product.getName().equals(name));
        if (anyNameMatches)
            throw new FieldNotUniqueException("Product name must be unique!");
    }
}
