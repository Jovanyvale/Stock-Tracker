import 'dotenv/config';

//Validacion de variables de entorno

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`❌ Falta la variable de entorno: ${name}`);
    }
    return value;
}

export const env = {
    port: Number(process.env.PORT ?? 3001),
    finnhubApiKey: required('FINNHUB_API_KEY'),
    nodeEnv: process.env.NODE_ENV ?? 'development',
};