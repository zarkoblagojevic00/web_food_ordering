package repositories.json.conversion.deserialization;

import beans.Entity;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;
import repositories.json.conversion.ParametricTypeChecker;

public class EntityBeanDeserializerModifier<T extends Entity> extends BeanDeserializerModifier {
    final private ParametricTypeChecker checker;

    public EntityBeanDeserializerModifier(Class<T> typeParameterClass) {
        super();
        this.checker = new ParametricTypeChecker(typeParameterClass);
    }

    @Override
    public JsonDeserializer<?> modifyDeserializer(DeserializationConfig config,
                                                  BeanDescription beanDesc,
                                                  JsonDeserializer<?> deserializer) {
        Class<?> beanClass = beanDesc.getBeanClass();
        if (checker.isEntityDifferentThanT(beanClass)) {
            return new EntityDeserializer<T>((Class<? extends T>) beanClass);
        }
        return super.modifyDeserializer(config, beanDesc, deserializer);
    }
}
