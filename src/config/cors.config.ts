import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const CORS_CONFIG : CorsOptions = {
    origin : process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}