export interface Person {
    "parentId": string | null,
    "id": string | null,
    "firstname": String | null,
    "lastname": String | null,
    "email": String | null,
    "phone": String | null,
    "birthday": String | null,
    "gender": String | null,
    "address": {
        "id": Number | null,
        "street": String | null,
        "streetName": String | null,
        "city": String | null,
        "country": String | null,
    }
}

export interface FakerPerson {
    parentId?: string | null,
    id?: string | null,
    bio?: string | null,
    fullName?: string | null,
    jobTitle?: string | null,
    sex?: string | null
}