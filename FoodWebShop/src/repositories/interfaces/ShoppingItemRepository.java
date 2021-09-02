package repositories.interfaces;

import beans.ecommerce.ShoppingItem;
import repositories.interfaces.base.Repository;

import java.util.Collection;

public interface ShoppingItemRepository extends Repository<ShoppingItem> {
    public Collection<ShoppingItem> getMultipleWithProducts(Collection<Long> ids);
}
