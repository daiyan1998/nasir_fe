import { queryClient } from "@/lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"

export const QueryProvider = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}