package repositories;

import beans.TestChild;
import beans.TestUser;
import beans.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import repositories.json.conversion.deserialization.EntityBeanDeserializerModifier;
import repositories.json.conversion.serialization.EntityBeanSerializerModifier;

import java.io.IOException;
import java.util.ArrayList;
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
		module.setSerializerModifier(new EntityBeanSerializerModifier<User>(User.class));
		module.setDeserializerModifier(new EntityBeanDeserializerModifier<User>(User.class));
		mapper.registerModule(module);
		User user = new User();
		user.setId(10);
		User user2 = new User();
		user2.setId(20);
		TestChild child = new TestChild("1");
		child.setId(100);
		TestChild child2 = new TestChild("2");
		child2.setId(200);
		user.setChild(child);
		user2.setChild(child2);

		String userJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
		System.out.println(userJson);
		User newUser = mapper.readValue(userJson, User.class);

		Collection<User> users = new ArrayList<>();
		users.add(user);
		users.add(user2);

		String usersJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(users);
		System.out.println(usersJson);
		List<User>newUsers = mapper.readValue(usersJson,  new TypeReference<List<User>>() { });

		System.out.println("Done");


		//newUsers.stream().forEach(u -> System.out.println(u.getFirstName() + u.getId() + u.getChild().getId()));


		ObjectMapper mapper2 = new ObjectMapper();
		SimpleModule module2 = new SimpleModule("SerChild");
		module2.setSerializerModifier(new EntityBeanSerializerModifier<TestChild>(TestChild.class));
		module2.setDeserializerModifier(new EntityBeanDeserializerModifier<TestChild>(TestChild.class));

		mapper2.registerModule(module2);

		TestChild child3 = new TestChild("Heii", user);
		child3.setId(10);
		String childJson = mapper2.writerWithDefaultPrettyPrinter().writeValueAsString(child3);
		System.out.println(childJson);
		TestChild newChild = mapper2.readValue(childJson, TestChild.class);
		System.out.println(newChild.getUser().getId());

		Collection<TestChild> children = new ArrayList<>();
		children.add(child3);
		TestChild child4 = new TestChild("Test", user2);
		child4.setId(20);
		children.add(child4);

		String childrenJson = mapper2.writerWithDefaultPrettyPrinter().writeValueAsString(children);
		System.out.println(childrenJson);
		Collection<TestChild> newChildren = mapper2.readValue(childrenJson, new TypeReference<Collection<TestChild>>() { });
		newChildren.stream().forEach(u -> System.out.println(u.getText() + u.getId()));

	}
}
