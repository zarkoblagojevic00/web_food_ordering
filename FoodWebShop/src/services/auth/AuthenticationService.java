package services.auth;

import beans.users.base.Credentials;
import beans.users.base.User;
import security.JwtUtil;
import services.UserService;
import services.exceptions.BadCredentialsException;

import javax.inject.Inject;

public class AuthenticationService {
    final private UserService userService;
    final private JwtUtil jwtUtil;

    @Inject
    public AuthenticationService(UserService userService) {
        this.userService = userService;
        this.jwtUtil = new JwtUtil();
    }

    public AuthenticationResponse login(Credentials credentials) {
        User loginUser = userService.findUserByUsername(credentials.getUsername());
        if (!loginUser.isMyIdentity(credentials)) {
            throw new BadCredentialsException("Wrong password!");
        }
        return createAuthenticationResponse(loginUser);
    }

    public AuthenticationResponse signup(RegistrationData regData) {
        User savedCustomer = userService.addUser(regData);
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
}
