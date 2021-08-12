package config;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import repositories.ITestRepository;
import repositories.TestRepository;
import repositories.interfaces.AdminRepository;
import repositories.interfaces.CustomerRepository;
import repositories.interfaces.DelivererRepository;
import repositories.interfaces.ManagerRepository;
import repositories.json.repos.AdminJsonFileRepository;
import repositories.json.repos.CustomerJsonFileRepository;
import repositories.json.repos.DelivererJsonFileRepository;
import repositories.json.repos.ManagerJsonFileRepository;
import services.TestService;
import services.auth.AuthenticationService;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApplicationConfig extends ResourceConfig {
    final private Map<Class<?>, Class<?>> dependencyPairs;
    final private List<Class<?>> concretes;

    public ApplicationConfig() {
        dependencyPairs = new HashMap<Class<?>, Class<?>>() {{
            put(ITestRepository.class, TestRepository.class);
            put(AdminRepository.class, AdminJsonFileRepository.class);
            put(CustomerRepository.class, CustomerJsonFileRepository.class);
            put(ManagerRepository.class, ManagerJsonFileRepository.class);
            put(DelivererRepository.class, DelivererJsonFileRepository.class);
        }};

        concretes = Arrays.asList(
                TestService.class,
                AuthenticationService.class
        );

        registerDependencyInjection();
        registerConcretes();
        register(RolesAllowedDynamicFeature.class);
    }

    private void registerConcretes() {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                for (Class<?> concrete: concretes)
                    bindAsContract(concrete);
            }
        });
    }

    private void registerDependencyInjection() {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                for (Class<?> contract : dependencyPairs.keySet()) {
                    Class<?> implementation = dependencyPairs.get(contract);
                    bind(implementation).to(contract);
                }
            }
        });
    }


}