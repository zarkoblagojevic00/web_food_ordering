package repositories.interfaces.base;

import beans.users.base.User;

public interface UserRepository<T extends User> extends Repository<T>{
    public User getUserByUsername(String username);
}
