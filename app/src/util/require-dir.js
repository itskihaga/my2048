export default context => context
    .keys()
    .map(context)
    .map(e => e.default);