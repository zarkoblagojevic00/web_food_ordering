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

    private <T> void registerService(Class<T> service) {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                bindAsContract(service);
            }
        });
    }

    private <T, K> void registerDependencyInjection(Class<T> implementation, Class<K> contract) {
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(implementation).to(contract);
            }
        });
    }


}