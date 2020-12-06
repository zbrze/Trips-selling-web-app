export interface Trip{
    id: number,
    name: string,
    country: string,
    dateFrom: Date,
    dateTo: Date,
    price: number,
    places: number,
    booked: number,
    description: string,
    photoURL: string,
    rating: number,
    votes: number,
    inCart: number
}