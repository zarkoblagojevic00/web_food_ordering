package repositories.json.conversion.serialization;

import beans.Entity;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;


public class EntitySerializer<T extends Entity> extends StdSerializer<Entity> {

    public EntitySerializer(Class<Entity> entityClass) {
        super(entityClass);
    }

    @Override
    public void serialize(Entity entity,
                          JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider)
            throws IOException, JsonGenerationException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("id", String.valueOf(entity.getId()));
        jsonGenerator.writeEndObject();
    }
}
