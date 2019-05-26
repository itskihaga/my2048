
type Maybe<T>  = Just<T> | Nothing

interface Just<T> {
    just:true,
    value:T
}

interface Nothing{
    just:false
}

export {Maybe,Just,Nothing}