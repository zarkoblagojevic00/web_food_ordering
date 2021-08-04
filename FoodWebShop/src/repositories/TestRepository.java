package repositories;

import beans.TestChild;
import beans.TestUser;
import beans.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import repositories.jsonconversion.serialize.EntityBeanSerializerModifier;


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
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return user;
	}

	private void testMapper() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		ObjectMapper mapper2 = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		SimpleModule module2 = new SimpleModule();
		module.setSerializerModifier(new EntityBeanSerializerModifier<User>(User.class));
		module2.setSerializerModifier(new EntityBeanSerializerModifier<TestChild>(TestChild.class));
		mapper.registerModule(module);
		mapper2.registerModule(module2);

		User user = new User();
		user.setId(25);
		TestChild child = new TestChild("Heii", user);
		System.out.println(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user));
		System.out.println(mapper2.writerWithDefaultPrettyPrinter().writeValueAsString(child));
	}
}
