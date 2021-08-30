package services;

import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;
import beans.users.roles.admin.Admin;
import beans.users.roles.customer.Customer;
import beans.users.roles.deliverer.Deliverer;
import beans.users.roles.manager.Manager;
import dtos.PasswordUpdateDTO;
import dtos.UserOverviewDTO;
import repositories.interfaces.AdminRepository;
import repositories.interfaces.CustomerRepository;
import repositories.interfaces.DelivererRepository;
import repositories.interfaces.ManagerRepository;
import repositories.interfaces.base.UserRepository;
import repositories.json.repos.base.EntityNotFoundException;
import services.auth.RegistrationData;
import services.exceptions.BadCredentialsException;
import services.exceptions.UsernameAlreadyExistsException;

import javax.inject.Inject;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class UserService {
    private Map<Role, UserProxy> proxies;

    public UserService() {

    }

    @Inject
    public UserService(AdminRepository adminRepo, CustomerRepository customerRepo, ManagerRepository managerRepo, DelivererRepository delivererRepo) {
        proxies = new HashMap<Role, UserProxy>() {{
            put(Role.ADMIN, new UserProxy(adminRepo, Admin.class));
            put(Role.CUSTOMER, new UserProxy(customerRepo, Customer.class));
            put(Role.DELIVERER, new UserProxy(delivererRepo, Deliverer.class));
            put(Role.MANAGER, new UserProxy(managerRepo, Manager.class));
        }};
    }

    public User findUserByUsername(String username) {
        return proxies.values().stream()
                .map(userProxy -> userProxy.findUserByUsername(username))
                .filter(Objects::nonNull)
                .findFirst()
                .orElseThrow(() -> new BadCredentialsException("No user with given username!"));
    }

    public User addUser(RegistrationData regData) {
        return trySaveUser(regData);
    }

    public User updateUser(User user) {
        User existing = findUserById(user.getRole(), user.getId());
        String username = user.getUsername();
        if (!username.equals(existing.getUsername())) {
            checkUsernameExists(username);
        }

        PersonalData personalData = user.getPersonalData();
        Credentials newCredentials = new Credentials(username, existing.getCredentials().getPassword());

        existing.setCredentials(newCredentials);
        existing.setPersonalData(personalData);
        return proxies.get(existing.getRole()).update(existing);
    }

    public void updatePassword(PasswordUpdateDTO dto) {
        User existing = findUserById(dto.getRole(), dto.getId());
        String username = existing.getUsername();
        Credentials claim = new Credentials(username, dto.getOldPassword());
        if (!existing.isMyIdentity(claim)) {
            throw new BadCredentialsException("Old password is incorrect!");
        }
        existing.setCredentials(new Credentials(username, dto.getNewPassword()));
        proxies.get(existing.getRole()).update(existing);
    }

    public UserOverviewDTO getUserProfile(String username) {
        return new UserOverviewDTO(findUserByUsername(username));
    }

    private User findUserById(Role role, long id) {
        return proxies.get(role).findUserById(id);
    }

    private User trySaveUser(RegistrationData regData) {
        String username = regData.getCredentials().getUsername();
        checkUsernameExists(username);
        return saveUser(regData);
    }

    private void checkUsernameExists(String username) {
        try {
            if (findUserByUsername(username) != null) {
                throw new UsernameAlreadyExistsException("User with username: " + username + " already exists.");
            }
        } catch (BadCredentialsException ignored) {
        }
    }

    private User saveUser(RegistrationData regData) {
        UserProxy userProxy = proxies.get(regData.getRole());
        return userProxy.saveUser(regData.getCredentials(), regData.getPersonalData());
    }

    private class UserProxy {
        final private UserRepository<User> userRepo;
        final private Class<? extends User> userClass;

        public UserProxy(UserRepository userRepo, Class<? extends User> userClass) {
            this.userRepo = userRepo;
            this.userClass = userClass;
        }

        public User saveUser(Credentials credentials, PersonalData personalData) {
            try {
                return userRepo.save(getConstructor().newInstance(credentials, personalData));
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException("No such constructor for class: "+ userClass, e);
            }
        }

        private Constructor<? extends User> getConstructor() {
            try {
                return (Constructor<? extends User>) userClass.getConstructor(Credentials.class, PersonalData.class);
            } catch (NoSuchMethodException e) {
                throw new RuntimeException("No such constructor for class: "+ userClass.getSimpleName(), e);
            }
        }

        private User findUserByUsername(String username) {
            return userRepo.getUserByUsername(username);
        }

        public User findUserById(long id) {
            try {
                return userRepo.get(id);
            } catch (EntityNotFoundException ignored){
            }
            return null;
        }

        public User update(User existing) {
            return userRepo.update(existing);
        }
    }
}
