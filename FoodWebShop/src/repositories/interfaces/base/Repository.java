package repositories.interfaces.base;

import beans.Entity;

import java.util.Collection;

public interface Repository<T extends Entity> {
    public long size();
    public T get(Long id);
    public Collection<T> getAll();
    public Collection<T> getMultiple(Collection<Long> ids);
    public T save(T entity);
    public Collection<T> saveAll(Collection<T> entities);
    public T update(T entity);
    public void delete(Long id);
}
