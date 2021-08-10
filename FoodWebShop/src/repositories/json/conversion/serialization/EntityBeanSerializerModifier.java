package repositories.json.conversion.serialization;

import beans.Entity;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;
import repositories.json.conversion.ParametricTypeChecker;

public class EntityBeanSerializerModifier<T extends Entity> extends BeanSerializerModifier {
    final private ParametricTypeChecker checker;

    public EntityBeanSerializerModifier(Class<T> typeParameterClass) {
        super();
        this.checker = new ParametricTypeChecker(typeParameterClass);
    }

    @Override
    public JsonSerializer<?> modifySerializer(SerializationConfig config,
                                              BeanDescription beanDesc,
                                              JsonSerializer<?> serializer) {
        Class<?> beanClass = beanDesc.getBeanClass();
        if (checker.isEntityDifferentThanT(beanClass)) {
            return new EntitySerializer<>((Class<Entity>) beanClass);
        }
        return super.modifySerializer(config, beanDesc, serializer);
    }
}
