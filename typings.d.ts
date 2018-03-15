declare module "*.json" {
    const value: any;
    export default value;
}
interface Window {
    ccxt: any;
}