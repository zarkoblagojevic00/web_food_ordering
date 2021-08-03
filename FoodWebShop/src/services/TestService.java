package services;

import beans.TestUser;
import repositories.ITestRepository;

import javax.inject.Inject;

public class TestService {
    private final ITestRepository testRepo;

    @Inject
    public TestService(ITestRepository testRepo)  {
        this.testRepo = testRepo;
    }

    public TestUser getUser(int id) {
        return testRepo.getUser(id);
    }

    public TestUser saveUser(TestUser user) {
        return testRepo.saveUser(user);
    }


}
