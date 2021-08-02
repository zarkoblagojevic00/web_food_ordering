package repositories;

import beans.TestUser;

public class TestRepository {
	public TestRepository() {
		
	}
	
	public TestUser getUser() {
		return new TestUser("Marko", "Markovic");
	}
}
