package repositories;

import beans.TestChild;
import beans.TestUser;
import beans.TestSerialUser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import repositories.json.conversion.deserialization.EntityBeanDeserializerModifier;
import repositories.json.conversion.serialization.EntityBeanSerializerModifier;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;


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
		module.setSerializerModifier(new EntityBeanSerializerModifier<TestSerialUser>(TestSerialUser.class));
		module.setDeserializerModifier(new EntityBeanDeserializerModifier<TestSerialUser>(TestSerialUser.class));
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

		System.out.println("Done");

	}
}
