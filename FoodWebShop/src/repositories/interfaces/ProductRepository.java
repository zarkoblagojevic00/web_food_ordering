package repositories.interfaces;

import beans.restaurants.Product;
import repositories.interfaces.base.Repository;
import services.exceptions.FieldNotUniqueException;

import java.util.Collection;

public interface ProductRepository extends Repository<Product> {
    public Collection<Product> getProductsForRestaurant(long restaurantId);

    void checkUniqueName(String name) throws FieldNotUniqueException;
}
