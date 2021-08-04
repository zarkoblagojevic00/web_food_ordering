package config;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import repositories.ITestRepository;
import repositories.TestRepository;
import services.TestService;

public class ApplicationConfig extends ResourceConfig {
    public ApplicationConfig() {
        registerDependencyInjection(TestRepository.class, ITestRepository.class);
        registerService(TestService.class);
    }

    private void registerService(Class<?> service) {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                bindAsContract(service);
            }
        });
    }

    private void registerDependencyInjection(Class<?> implementation, Class<?> contract) {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(implementation).to(contract);
            }
        });
    }


}