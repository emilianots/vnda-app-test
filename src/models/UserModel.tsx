export default interface User {
    id: number | null
    name: string,
    email: string,
    tags: Array<string>,
    role: number,
    external_code: string
}