package repositories.interfaces;

import beans.ecommerce.ShoppingCart;
import beans.users.base.User;
import repositories.interfaces.base.Repository;

public interface ShoppingCartRepository extends Repository<ShoppingCart> {
    public void createShoppingCartForUser(long id);

    public ShoppingCart findUsersShoppingCart(long userId);
}
