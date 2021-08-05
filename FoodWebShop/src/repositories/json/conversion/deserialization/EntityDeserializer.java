package repositories.json.conversion.deserialization;

import beans.Entity;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class EntityDeserializer<T extends Entity> extends StdDeserializer<Entity> {
    private final EntityCreator<T> creator;

    public EntityDeserializer(Class<? extends T> entityClass) {
        super(entityClass);
        this.creator = new EntityCreator<T>(entityClass);
    }

    @Override
    public Entity deserialize(JsonParser jsonParser,
                              DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        T entity = creator.createEntity();
        entity.setId(jsonParser.getValueAsLong(-1));
        return entity;
    }
}
