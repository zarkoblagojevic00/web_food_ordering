package repositories.json.conversion.deserialization;

import beans.Entity;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.text.MessageFormat;

public class EntityCreator<T extends Entity> implements Serializable {
    private Constructor<? extends T> constructor;
    final private Class<? extends T> entityClass;

    public EntityCreator(Class<? extends T> entityClass) {
        this.entityClass = entityClass;
        initConstructor();
    }

    public T createEntity() {
        try {
            return constructor.newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException(getEntityCreationFailedErrorMessage(), e);
        }
    }

    private void initConstructor() {
        try {
            this.constructor = entityClass.getConstructor();
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(getEntityConstructorErrorMessage(), e);
        }
    }

    private String getEntityConstructorErrorMessage() {
        return MessageFormat.format("Entity {0} must have empty constructor!", entityClass);
    }

    private String getEntityCreationFailedErrorMessage() {
        return MessageFormat.format("Entity {0} creation failed!", entityClass);
    }
}