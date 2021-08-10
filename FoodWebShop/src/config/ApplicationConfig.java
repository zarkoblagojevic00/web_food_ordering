package config;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import repositories.ITestRepository;
import repositories.TestRepository;
import services.TestService;

import java.util.*;

public class ApplicationConfig extends ResourceConfig {
    final private Map<Class<?>, Class<?>> dependencyPairs;
    final private List<Class<?>> concretes;

    public ApplicationConfig() {
        dependencyPairs = new HashMap<Class<?>, Class<?>>() {{
            put(ITestRepository.class, TestRepository.class);
        }};

        concretes = Arrays.asList(
                TestService.class
        );

        registerDependencyInjection();
        registerConcretes();

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