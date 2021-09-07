package repositories.interfaces;

import beans.ecommerce.ShoppingItem;
import repositories.interfaces.base.Repository;

import java.util.Collection;

public interface ShoppingItemRepository extends Repository<ShoppingItem> {
    Collection<ShoppingItem> getMultipleWithProducts(Collection<Long> ids);

    ShoppingItem getItemWithProduct(long id);
}
