package dtos;

import beans.users.base.Role;

public class PasswordUpdateDTO {
    private String oldPassword;
    private String newPassword;
    private long id;
    private Role role;

    public PasswordUpdateDTO() {
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public long getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }
}
