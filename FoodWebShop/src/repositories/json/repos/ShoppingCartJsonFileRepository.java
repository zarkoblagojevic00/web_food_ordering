package repositories.json.repos;

import beans.ecommerce.ShoppingCart;
import beans.users.base.User;
import repositories.interfaces.ShoppingCartRepository;
import repositories.json.repos.base.EntityNotFoundException;
import repositories.json.repos.base.JsonFileRepository;

public class ShoppingCartJsonFileRepository extends JsonFileRepository<ShoppingCart> implements ShoppingCartRepository {

    public ShoppingCartJsonFileRepository() {
        super(ShoppingCart.class);
    }

    @Override
    public void createShoppingCartForUser(long id) {
        save(new ShoppingCart(id));
    }

    @Override
    public ShoppingCart findUsersShoppingCart(long userId) {
        return getAll().stream()
                .filter(shoppingCart -> shoppingCart.belongsToUser(userId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("No shopping cart found for user: " + userId ));
    }
}
