package repositories;

import beans.TestChild;
import beans.TestSerialUser;
import beans.TestUser;
import beans.users.base.Credentials;
import beans.users.base.Gender;
import beans.users.base.PersonalData;
import beans.users.roles.admin.Admin;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import repositories.json.conversion.deserialization.EntityBeanDeserializerModifier;
import repositories.json.conversion.serialization.EntityBeanSerializerModifier;

import java.io.IOException;
import java.util.*;


public class TestRepository implements ITestRepository {

	public TestRepository() {
		
	}

	public TestUser getUser(int id) {
		return new TestUser("Marko", "Markovic");
	}

	@Override
	public TestUser saveUser(TestUser user) {
		user.id = 1;
		System.out.println("poiiii");
		try {
			testMapper();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return user;
	}

	private void testMapper() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule("SerUser");
		module.setSerializerModifier(new EntityBeanSerializerModifier<>(TestSerialUser.class));
		module.setDeserializerModifier(new EntityBeanDeserializerModifier<>(TestSerialUser.class));
		mapper.registerModule(module);

		TestSerialUser user = new TestSerialUser();
		user.setId(10);
		TestSerialUser user2 = new TestSerialUser();
		user2.setId(20);

		TestChild child = new TestChild("1");
		child.setId(100);
		TestChild child2 = new TestChild("2");
		child2.setId(200);
		List<TestChild> children = Arrays.asList(child, child2);

		user.setChild(child);
		user.setChildren(children);
		user2.setChild(child2);

		String userJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
		System.out.println(userJson);
		TestSerialUser newUser = mapper.readValue(userJson, TestSerialUser.class);

		Collection<TestSerialUser> users = new ArrayList<>();
		users.add(user);
		users.add(user2);

		String usersJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(users);
		System.out.println(usersJson);
		List<TestSerialUser>newUsers = mapper.readValue(usersJson,  new TypeReference<List<TestSerialUser>>() { });

		ObjectMapper allMap = new ObjectMapper();
		allMap.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
		allMap.enable(SerializationFeature.INDENT_OUTPUT);
		Credentials creds = new Credentials("test", "test");
		String credJson = allMap.writeValueAsString(creds);
		Credentials deser = allMap.readValue(credJson, Credentials.class);

		PersonalData info = new PersonalData("Test", "Testic", Gender.MALE, new Date());
		Admin admin = new Admin(creds, info);
		admin.setId(25);
		admin.setDeleted(true);
		ObjectMapper mappi = new ObjectMapper();

		mappi.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE);
		mappi.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
		mappi.enable(SerializationFeature.INDENT_OUTPUT);
		mappi.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

		SimpleModule modulo = new SimpleModule("proba");
		modulo.setSerializerModifier(new EntityBeanSerializerModifier<>(Admin.class));
		modulo.setDeserializerModifier(new EntityBeanDeserializerModifier<>(Admin.class));
		mappi.registerModule(modulo);

		String adminJson = mappi.writeValueAsString(admin);
		Admin newAdmin = mappi.readValue(adminJson, Admin.class);

		String adminsJson = mappi.writeValueAsString(Arrays.asList(admin, admin, admin));
		Collection<Admin> admins = mappi.readValue(adminsJson, new TypeReference<Collection<Admin>>() {});
		System.out.println("Done");

	}
}
