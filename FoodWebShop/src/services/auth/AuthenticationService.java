package services.auth;

import beans.users.base.Credentials;
import beans.users.base.Role;
import beans.users.base.User;
import beans.users.roles.customer.Customer;
import security.JwtUtil;
import services.ShoppingCartService;
import services.UserService;
import services.exceptions.BadCredentialsException;

import javax.inject.Inject;

public class AuthenticationService {
    final private UserService userService;
    final private ShoppingCartService shoppingCartService;
    final private JwtUtil jwtUtil;

    @Inject
    public AuthenticationService(UserService userService, ShoppingCartService shoppingCartService) {
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.jwtUtil = new JwtUtil();
    }

    public AuthenticationResponse login(Credentials credentials) {
        User loginUser = userService.findUserByUsername(credentials.getUsername());
        if (!loginUser.isMyIdentity(credentials)) {
            throw new BadCredentialsException("Wrong password!");
        }
        if (loginUser.hasAuthority(Role.CUSTOMER)) {
            createShoppingCartForUser(loginUser.getId());
        }
        return createAuthenticationResponse(loginUser);
    }

    public AuthenticationResponse signup(RegistrationData regData) {
        User savedCustomer = userService.addUser(regData);
        createShoppingCartForUser(savedCustomer.getId());
        return createAuthenticationResponse(savedCustomer);
    }

    public AuthenticationResponse editProfile(User user) {
        User updatedUser = userService.updateUser(user);
        return createAuthenticationResponse(updatedUser);
    }

    private AuthenticationResponse createAuthenticationResponse(User user) {
        String jwt = jwtUtil.generateToken(user);
        return new AuthenticationResponse(jwt);
    }

    private void createShoppingCartForUser(long userId) {
        shoppingCartService.createShoppingCartForUser(userId);
    }

    public void logout(String username) {
        User user = userService.findUserByUsername(username);
        invalidateToken(user);
        if (user.hasAuthority(Role.CUSTOMER)) {
            shoppingCartService.destroyShoppingCart(user.getId());
        }
    }

    private void invalidateToken(User user) {

    }
}
