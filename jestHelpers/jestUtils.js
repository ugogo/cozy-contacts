const isDeprecatedLifecycleWarning = (msg, componentName) => {
  return (
    msg.includes('has been renamed, and is not recommended for use') &&
    msg.includes(componentName)
  )
}

export const ignoreOnConditions = (originalWarn, ignoreConditions) => {
  return function(...args) {
    const msg = args[0]
    if (ignoreConditions.some(condition => condition(msg))) {
      return
    }
    originalWarn.apply(this, args)
  }
}

export const makeDeprecatedLifecycleMatcher = componentName => msg =>
  isDeprecatedLifecycleWarning(msg, componentName)

export const callAndThrow = (fn, errorMessage) => {
  return function() {
    fn.apply(this, arguments)
    throw new Error(errorMessage)
  }
}