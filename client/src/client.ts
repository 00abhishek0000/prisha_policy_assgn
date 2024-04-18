import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import {AppRouter} from "../../server/app"

export const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: "http://localhost:3000/trpc"
    })]
})
