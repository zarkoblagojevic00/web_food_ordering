package repositories.interfaces.base;

import beans.Entity;

import java.util.Collection;

public interface Repository<T extends Entity> {
    public T get(Long id);
    public Collection<T> getAll();
    public Collection<T> getMultiple(Collection<Long> ids);
    public T save(T entity);
    public T update(T entity);
    public void delete(Long id);
}
