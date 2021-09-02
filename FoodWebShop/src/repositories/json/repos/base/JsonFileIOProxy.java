package repositories.json.repos.base;

import beans.Entity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import config.PathFinder;
import repositories.json.conversion.deserialization.EntityBeanDeserializerModifier;
import repositories.json.conversion.serialization.EntityBeanSerializerModifier;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class JsonFileIOProxy<T extends Entity> {
    private File file;
    private Class<T> entityClass;
    private ObjectMapper mapper;
    protected PathFinder pathFinder;

    public JsonFileIOProxy(Class<T> entityClass) {
        this.entityClass = entityClass;
        this.mapper = createObjectMapper();
        this.pathFinder = new PathFinder("Resources", "database");
        this.file = initializeFile();
    }

    public Map<Long, T> getEntities() {
        try {
            return getEntitiesFromFile();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read entities from file: " + file.getPath() , e);
        }
    }

    public void saveEntities(Map<Long, T> entities) {
        try {
            saveEntitiesToFile(entities);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save entities to file: " + file.getPath() , e);
        }
    }

    public Class<T> getEntityClass() {
        return entityClass;
    }



    private ObjectMapper createObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE);
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        SimpleModule module = new SimpleModule(entityClass.getSimpleName());
        module.setSerializerModifier(new EntityBeanSerializerModifier<T>(entityClass));
        module.setDeserializerModifier(new EntityBeanDeserializerModifier<T>(entityClass));
        mapper.registerModule(module);

        return mapper;
    }

    private File initializeFile() {
        File file = new File(getFilePath());
        return file.exists() ? file : getEmptyJsonArrayInitializedFile(file);
    }

    private String getFilePath() {
        String jsonFileName = entityClass.getSimpleName() + ".json";
        pathFinder.appendToCurrentPath(jsonFileName);
        return pathFinder.getCurrentPath();
    }

    private File getEmptyJsonArrayInitializedFile(File file) {

        try {
            if (file.createNewFile()) {
                mapper.writeValue(file, new ArrayList<T>());
            }
            else {
                throw new RuntimeException("File: " + file.getPath() + "already exists.");
            }
        } catch (IOException e) {
            String path = file.getAbsolutePath();
            throw new RuntimeException("Failed to initialize new file: " + file.getPath() , e);
        }
        return file;
    }

    private Map<Long,T> getEntitiesFromFile() throws IOException {
        JavaType entityCollectionType = mapper.getTypeFactory().
                constructCollectionType(Collection.class, entityClass);
        Collection<T> entities = mapper.readValue(file, entityCollectionType);
        return entities.stream()
                .collect(Collectors.toMap(T::getId, Function.identity()));
    }

    private void saveEntitiesToFile(Map<Long, T> entities) throws IOException {
        mapper.writeValue(file, entities.values());
    }

}
