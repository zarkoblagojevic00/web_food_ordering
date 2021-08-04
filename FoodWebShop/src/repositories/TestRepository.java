package repositories;

import beans.TestChild;
import beans.TestUser;
import beans.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import repositories.json.conversion.deserialization.EntityBeanDeserializerModifier;
import repositories.json.conversion.serialization.EntityBeanSerializerModifier;

import java.io.IOException;


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

		module.setSerializerModifier(new EntityBeanSerializerModifier<User>(User.class));
		module.setDeserializerModifier(new EntityBeanDeserializerModifier<User>(User.class));
		mapper.registerModule(module);
		User user = new User();
		user.setId(25);

		String userJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
		System.out.println(userJson);
		User newUser = mapper.readValue(userJson, User.class);
		System.out.println(newUser.getChild().getId());

		ObjectMapper mapper2 = new ObjectMapper();
		SimpleModule module2 = new SimpleModule("SerChild");
		module2.setSerializerModifier(new EntityBeanSerializerModifier<TestChild>(TestChild.class));
		module2.setDeserializerModifier(new EntityBeanDeserializerModifier<TestChild>(TestChild.class));

		mapper2.registerModule(module2);

		TestChild child = new TestChild("Heii", user);
		String childJson = mapper2.writerWithDefaultPrettyPrinter().writeValueAsString(child);
		System.out.println(childJson);
		TestChild newChild = mapper2.readValue(childJson, TestChild.class);
		System.out.println(newChild.getUser().getId());
	}
}
