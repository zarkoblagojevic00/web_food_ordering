package repositories.json.conversion.deserialization;

import beans.Entity;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class EntityDeserializer<T extends Entity> extends StdDeserializer<Entity> {
    private final repositories.json.conversion.deserialization.EntityCreator<T> creator;

    public EntityDeserializer(Class<? extends T> entityClass) {
        super(entityClass);
        this.creator = new repositories.json.conversion.deserialization.EntityCreator<T>(entityClass);
    }

    @Override
    public Entity deserialize(JsonParser jsonParser,
                              DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        T entity = creator.createEntity();
        entity.setId(parseId(jsonParser));
        return entity;
    }

    private long parseId(JsonParser jsonParser) throws IOException {
        while(!jsonParser.isClosed()){
            JsonToken jsonToken = jsonParser.nextToken();

            if(JsonToken.FIELD_NAME.equals(jsonToken)){
                String fieldName = jsonParser.getCurrentName();

                jsonParser.nextToken();

                if("id".equals(fieldName)) {
                    return jsonParser.getValueAsLong();
                }
            }
        }
        return -1;
    }

}
