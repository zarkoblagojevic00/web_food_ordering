package repositories.json.repos.base;

import beans.Entity;
import config.BasicRootPathFinder;
import repositories.interfaces.base.Repository;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

public class JsonFileRepository<T extends Entity> implements Repository<T> {
    final private Map<Long, T> entities;
    final private JsonFileIOProxy<T> proxyIO;

    public JsonFileRepository(Class<T> entityClass) {
        proxyIO = new JsonFileIOProxy<T>(entityClass, new BasicRootPathFinder());
        this.entities = proxyIO.getEntities();
    }


    @Override
    public T get(Long id) {
        T entity = entities.get(id);
        if (entity == null || entity.isDeleted()) {
            throw new EntityNotFoundException(getEntityNotFoundErrorMessage(id));
        }
        return entity;
    }

    @Override
    public Collection<T> getAll() {
        return entities.values();
    }

    @Override
    public Collection<T> getMultiple(Collection<Long> ids) {
        return ids.stream()
                .map(this::get)
                .collect(Collectors.toList());
    }

    @Override
    public T save(T entity) {
        entity.setId(generateId());
        persistChanges(entity);
        return entity;
    }

    @Override
    public T update(T entity) {
        T oldEntity = get(entity.getId());
        persistChanges(entity);
        return entity;
    }

    @Override
    public void delete(Long id) {
        T entity = get(id);
        entity.setDeleted(true);
        persistChanges(entity);
    }

    private void persistChanges(T entity) {
        entities.put(entity.getId(), entity);
        proxyIO.saveEntities(entities);
    }

    private long generateId() {
        Long maxId= entities.keySet().stream()
                .max(Long::compareTo)
                .orElse(0L);
        return maxId + 1;
    }

    private String getEntityNotFoundErrorMessage(Long id) {
        return MessageFormat.format("Could not find entity of type: {0} with id: {1} ",
                proxyIO.getEntityClass(),
                id);
    }
}
