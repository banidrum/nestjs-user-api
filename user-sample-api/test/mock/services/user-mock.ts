export const MOCK_USER_CREATION = {
    "id": "uuid",
    "firstName": "Mock",
    "lastName": "User",
    "address": "Test Street",
    "email": "test@mock.com",
    "password": "123456"
}

export const MOCK_USER_CREATION_RETURN = { message: 'User created succesfully.' }

export const MOCK_GET_ALL_USERS = [
    {
        "id": "8a072a35-4d9a-49ec-ab6f-0517e2791b13",
        "firstName": "Test",
        "lastName": "Sample",
        "address": "XYZ Street",
        "email": "blabla@a.com",
        "password": "123456"
    }
]

export const MOCK_USER = {
    "id": "8a072a35-4d9a-49ec-ab6f-0517e2791b13",
    "firstName": "Test",
    "lastName": "Sample",
    "address": "XYZ Street",
    "email": "blabla@a.com",
    "password": "123456"
}

export const MOCK_EDITED_USER = {
    "id": "8a072a35-4d9a-49ec-ab6f-0517e2791b13",
    "firstName": "Edit",
    "lastName": "Test",
    "address": "Edit Street",
    "email": "blabla@a.com",
    "password": "123456"
}

export const NOT_EXISTING_USER = {
    "id": "8a072a35-4d9a-49ec-ab6f-0517e2791b18",
    "firstName": "None",
    "lastName": "Test",
    "address": "Edit Street",
    "email": "blabla@a.com",
    "password": "123456"
}

export const USER_NOT_FOUND = {};

export const USER_DELETED = { message: "User deleted succesfully." }