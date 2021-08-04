package repositories.json.conversion;

import beans.Entity;

public class ParametricTypeChecker<T> {
    final private Class<T> typeParameterClass;

    public ParametricTypeChecker(Class<T> typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }

    public boolean isEntityDifferentThanT(Class<?> beanClass) {
        return Entity.class.isAssignableFrom(beanClass) &&
                !this.typeParameterClass.equals(beanClass);
    }

}
