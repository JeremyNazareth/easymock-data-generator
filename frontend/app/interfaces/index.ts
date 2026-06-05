export interface Person {
    "id": Number | null,
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