// TODO Use shared resource to sync with FE
export default interface Institution {
    id: number,
    name: string,
    city: string,
    province: string,
    sector: string,
    eduction: string,
    status: string,
    archived?: boolean
}