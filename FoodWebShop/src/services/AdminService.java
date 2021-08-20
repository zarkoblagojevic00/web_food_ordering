package services;

import beans.users.roles.admin.Admin;
import dtos.AdminOverviewDTO;
import repositories.interfaces.AdminRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class AdminService {
    final private AdminRepository adminRepo;

    @Inject
    public AdminService(AdminRepository adminRepo) {
        this.adminRepo = adminRepo;
    }

    public Collection<AdminOverviewDTO> getAdminsOverview() {
        return adminRepo.getAll().stream()
                .map(this::createAdminOverviewDTO)
                .collect(Collectors.toList());
    }

    private AdminOverviewDTO createAdminOverviewDTO(Admin admin) {
        return new AdminOverviewDTO(admin);
    }
}
