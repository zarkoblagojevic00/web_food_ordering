package dtos;

import beans.users.roles.admin.Admin;

public class AdminOverviewDTO extends UserOverviewDTO {
    public AdminOverviewDTO(Admin admin) {
        super(admin);
    }
}
