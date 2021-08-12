package repositories.json.repos.base;

import beans.users.base.User;
import repositories.interfaces.base.UserRepository;

public class UserJsonFileRepository<T extends User> extends JsonFileRepository<T> implements UserRepository<T>  {
    public UserJsonFileRepository(Class<T> entityClass) {
        super(entityClass);
    }

    @Override
    public T getUserByUsername(String username) {
        return getAll().stream()
                .filter(user -> user.getCredentials().getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }
}
