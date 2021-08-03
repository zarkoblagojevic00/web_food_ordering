package repositories;

import beans.TestUser;

public class TestRepository implements ITestRepository {
	public TestRepository() {
		
	}
	
	public TestUser getUser(int id) {
		return new TestUser("Marko", "Markovic");
	}

	@Override
	public TestUser saveUser(TestUser user) {
		user.id = 1;
		return user;
	}
}
