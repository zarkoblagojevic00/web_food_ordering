package repositories;

import beans.TestUser;

public interface ITestRepository {
    public TestUser getUser(int id);

    public TestUser saveUser(TestUser user);
}
