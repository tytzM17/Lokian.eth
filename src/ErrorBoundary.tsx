import React from 'react'
import { AppProps } from '../../models'

type ErrBoundState = {
    hasError: boolean,
}

type ErrBoundInfoParam = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentStack: any,
}

export class ErrorBoundary extends React.Component<{ fallback: JSX.Element }, { hasError: boolean }>  {
    constructor(props: AppProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: string): ErrBoundState {
        // Update state so the next render will show the fallback UI.
        console.error(error)
        return { hasError: true }
    }

    componentDidCatch(error: string, info: ErrBoundInfoParam): void {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        //   logErrorToMyService(error, info.componentStack);
        console.error(error, info.componentStack)
    }

    render(): JSX.element {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback
        }

        return this.props.children;
    }
}