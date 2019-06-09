import * as React from 'react';

interface LandingProps {
    onClick:()=>void
}

export default ({onClick}:LandingProps) => (
    <section>
        <button onClick={onClick}>
            Start
        </button>
    </section>
)