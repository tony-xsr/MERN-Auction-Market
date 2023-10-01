# Create Account
`http://localhost:8080/api/auth/signup`

# POST DATA
JSON Data 
`
{
    "name":"test111",
    "email":"test36@gmail.com",
    "password":"tesAt1111",
    "passwordConfirm":"tesAt1111"
}
`
# Result
`
{"token":{"accessToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYxNzc2NDksImV4cCI6MTY5NjQzNjg0OX0.Pb0Qi-lYBiboCmG8NP0pLu3Z5tcuTEMLwtJZhvHcCVLx2e3K0oqSeDpGntDeJO7it9PLMEbUBGMKEvQVOREfYQ","refreshToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYxNzc2NDksImV4cCI6MTY5Njc4MjQ0OX0.dZjMxPQgHBREaryC2olh8qx1UXa5PXW4AHxlVok6zucatH6QH08upo7sEF2Ef6hMYYgrk8cr66XXn_kCpOcHGw"},"user":{"_id":"65199df1c1de2a4bd8060cc8","name":"test111","email":"test36@gmail.com","seller":false}}
`

# LOGIN 
`http://localhost:8080/api/auth/sigin`

# POST JSON
`
{
    "email":"test36@gmail.com",
    "password":"tesAt1111"
}
`

# RESULT

`
{
    "token": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYxNzgxNDgsImV4cCI6MTY5NjQzNzM0OH0.bB-uNHrRX_RzUp9J3oUuQUOUekO0vctxPSncdLGnwiMeZaOG2S-MSC-qBemZlOMfB9sf4fSQaCIUlYvtoBHNbQ",
        "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYxNzgxNDgsImV4cCI6MTY5Njc4Mjk0OH0.MTIrIREtrxoW3y0kkdr4LtlYqloLQDLYXhfloQxsLwyqHsCxa1uErBSsVaNT3Jb5n1n9_sS9QVFKwtJqfNI3AA"
    },
    "user": {
        "_id": "65199df1c1de2a4bd8060cc8",
        "name": "test111",
        "email": "test36@gmail.com",
        "seller": false
    }
}
`



# LOGOUT 

`http://localhost:8080/api/auth/signout`


# POST JSON
`
{
    "accessToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYxNzgxNDgsImV4cCI6MTY5NjQzNzM0OH0.bB-uNHrRX_RzUp9J3oUuQUOUekO0vctxPSncdLGnwiMeZaOG2S-MSC-qBemZlOMfB9sf4fSQaCIUlYvtoBHNbQ"
}
`

# RESULT
`
{
    "message": "Signout successful"
}
`