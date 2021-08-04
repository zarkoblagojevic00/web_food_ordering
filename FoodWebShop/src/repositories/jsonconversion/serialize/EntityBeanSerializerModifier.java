package repositories.jsonconversion.serialize;

import beans.Entity;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;

public class EntityBeanSerializerModifier<T extends Entity> extends BeanSerializerModifier {

    final private Class<T> typeParameterClass;  // tracking runtime T

    public EntityBeanSerializerModifier(Class<T> typeParameterClass) {
        super();
        this.typeParameterClass = typeParameterClass;
    }

    @Override
    public JsonSerializer<?> modifySerializer(SerializationConfig config,
                                              BeanDescription beanDesc,
                                              JsonSerializer<?> serializer) {
        Class<?> beanClass = beanDesc.getBeanClass();
        if (isEntityDifferentThanT(beanClass)) {
            return new EntitySerializer<T>((Class<T>) beanClass);
        }
        return super.modifySerializer(config, beanDesc, serializer);
    }

    private boolean isEntityDifferentThanT(Class<?> beanClass) {
        return Entity.class.isAssignableFrom(beanClass) &&
                !this.typeParameterClass.equals(beanClass);
    }
}
