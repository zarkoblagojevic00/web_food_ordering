package config;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.process.internal.RequestScoped;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import repositories.ITestRepository;
import repositories.TestRepository;
import repositories.interfaces.ActivityRepository;
import repositories.interfaces.AdminRepository;
import repositories.interfaces.CustomerRepository;
import repositories.interfaces.DelivererRepository;
import repositories.interfaces.ManagerRepository;
import repositories.interfaces.OrderRepository;
import repositories.interfaces.RestaurantRepository;
import repositories.json.repos.ActivityJsonFileRepository;
import repositories.json.repos.AdminJsonFileRepository;
import repositories.json.repos.CustomerJsonFileRepository;
import repositories.json.repos.DelivererJsonFileRepository;
import repositories.json.repos.ManagerJsonFileRepository;
import repositories.json.repos.OrderJsonFileRepository;
import repositories.json.repos.RestaurantJsonFileRepository;
import services.*;
import services.auth.AuthenticationService;

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
            put(RestaurantRepository.class, RestaurantJsonFileRepository.class);
            put(ActivityRepository.class, ActivityJsonFileRepository.class);
            put(OrderRepository.class, OrderJsonFileRepository.class);
        }};

        concretes = Arrays.asList(
                TestService.class,
                AuthenticationService.class,
                ActivityService.class,
                UserService.class,
                AdminService.class,
                CustomerService.class,
                ManagerService.class,
                DelivererService.class,
                RestaurantService.class
        );

        registerDependencyInjection();
        registerConcretes();
        register(RolesAllowedDynamicFeature.class);
        register(MultiPartFeature.class);
    }


    private void registerConcretes() {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                for (Class<?> concrete: concretes)
                    bindAsContract(concrete)
                            .proxy(true)    // filters are created once on app startup (app scoped)
                            .proxyForSameScope(false)  // use concrete for same request scope, use proxy for different scopes
                            .in(RequestScoped.class);
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