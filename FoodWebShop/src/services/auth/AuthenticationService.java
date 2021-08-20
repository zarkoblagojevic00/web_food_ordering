package services.auth;

import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.User;
import beans.users.roles.customer.Customer;
import beans.users.roles.deliverer.Deliverer;
import beans.users.roles.manager.Manager;
import repositories.interfaces.AdminRepository;
import repositories.interfaces.CustomerRepository;
import repositories.interfaces.DelivererRepository;
import repositories.interfaces.ManagerRepository;
import security.JwtUtil;
import services.exceptions.BadCredentialsException;
import services.exceptions.UsernameAlreadyExistsException;

import javax.inject.Inject;

public class AuthenticationService {
    final private AdminRepository adminRepo;
    final private CustomerRepository customerRepo;
    final private ManagerRepository managerRepo;
    final private DelivererRepository delivererRepo;
    final private JwtUtil jwtUtil;

    @Inject
    public AuthenticationService(AdminRepository adminRepo, CustomerRepository customerRepo, ManagerRepository managerRepo, DelivererRepository delivererRepo) {
        this.adminRepo = adminRepo;
        this.customerRepo = customerRepo;
        this.managerRepo = managerRepo;
        this.delivererRepo = delivererRepo;
        this.jwtUtil = new JwtUtil();
    }

    public AuthenticationResponse login(Credentials credentials) {
        User loginUser = findUserByUsername(credentials.getUsername());
        if (!loginUser.isMyIdentity(credentials)) {
            throw new BadCredentialsException("Wrong password!");
        }
        String jwt = jwtUtil.generateToken(loginUser);
        return new AuthenticationResponse(jwt);
    }

    public User findUserByUsername(String username) {
        User user = adminRepo.getUserByUsername(username);
        if (user != null) return user;
        user = customerRepo.getUserByUsername(username);
        if (user != null) return user;
        user = managerRepo.getUserByUsername(username);
        if (user != null) return user;
        user = delivererRepo.getUserByUsername(username);
        if (user != null) return user;

        throw new BadCredentialsException("No user with given username!");
    }


    public AuthenticationResponse addCustomer(AuthenticationData authData) {
        User savedCustomer = trySaveUser(authData);
        String jwt = jwtUtil.generateToken(savedCustomer);
        return new AuthenticationResponse(jwt);
    }

    private User trySaveUser(AuthenticationData authData) {
        String username = authData.getCredentials().getUsername();
        try {
            findUserByUsername(username);
        } catch (BadCredentialsException e) {
            return saveUser(authData);
        }
        throw new UsernameAlreadyExistsException("User with username: " + username + " already exists.");
    }

    private User saveUser(AuthenticationData authData) {
        Credentials credentials = authData.getCredentials();
        PersonalData personalData = authData.getPersonalData();

        switch (authData.getRole()) {
            case CUSTOMER:
                return customerRepo.save(new Customer(credentials, personalData));
            case MANAGER:
                return managerRepo.save(new Manager(credentials, personalData));
            case DELIVERER:
                return delivererRepo.save(new Deliverer(credentials, personalData));
            default:
                return null;
        }
    }

    public User addUser(AuthenticationData newUser) {
        return trySaveUser(newUser);
    }
}
