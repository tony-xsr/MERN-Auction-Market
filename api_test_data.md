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



# Create Auction 
##  URL
`http://localhost:8080/api/auction/create`

## Data
`
{
  "itemName": "item name 1", 
  "description": "test description", 
  "image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1200px-Test-Logo.svg.png", 
  "startingBid": 10.5,
  "status":"draft",
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYyNDI0NDAsImV4cCI6MTY5NjUwMTY0MH0.gPPvg4zHE6iR4XpYljSzGrwb6ahme6Z0ytWHNReLJHhtimrdQ-7IwXh7iFtY7U9fXdS46bh1hOpp-pAabWnW_Q"
}
`
##  Result
`{
    "message": "Auction created successfully",
    "auction": {
        "itemName": "item name 1",
        "description": "test description",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1200px-Test-Logo.svg.png",
        "seller": "65199df1c1de2a4bd8060cc8",
        "startingBid": 10.5,
        "status": "draft",
        "_id": "651a9bca169b60b2fba14aaf",
        "created": "2023-10-02T10:30:34.495Z",
        "bidStart": "2023-10-02T10:30:34.495Z",
        "bids": [],
        "__v": 0
    }
}`




# Get All Auction 
##  URL
`http://localhost:8080/api/auction/myauctions`

## Data
`
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYyNDI0NDAsImV4cCI6MTY5NjUwMTY0MH0.gPPvg4zHE6iR4XpYljSzGrwb6ahme6Z0ytWHNReLJHhtimrdQ-7IwXh7iFtY7U9fXdS46bh1hOpp-pAabWnW_Q"
}
`
##  Result
`{
    "auctions": [
        {
            "bidEnd": "2023-10-03T14:44:12.371Z",
            "_id": "651a9bca169b60b2fba14aaf",
            "itemName": "item name 1",
            "description": "test description",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1200px-Test-Logo.svg.png",
            "seller": "65199df1c1de2a4bd8060cc8",
            "startingBid": 10.5,
            "status": "draft",
            "created": "2023-10-02T10:30:34.495Z",
            "bidStart": "2023-10-02T10:30:34.495Z",
            "bids": [],
            "__v": 0
        },
        {
            "bidEnd": "2023-10-03T14:44:12.371Z",
            "_id": "651a9c76169b60b2fba14ab3",
            "itemName": "item name 2",
            "description": "test description",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1200px-Test-Logo.svg.png",
            "seller": "65199df1c1de2a4bd8060cc8",
            "startingBid": 10.5,
            "status": "published",
            "created": "2023-10-02T10:33:26.914Z",
            "bidStart": "2023-10-02T10:33:26.914Z",
            "bids": [],
            "__v": 0
        }
    ]
}`



# Update Status Auction
`http://localhost:8080/api/auction/update`

# Data
`
{
   "auctionId": "651a9bca169b60b2fba14aaf",
    "status": "published",
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYyNjE0MDIsImV4cCI6MTY5NjUyMDYwMn0.YFtm49hs97xqzUJVgK7XJ8u2QkMOdO7U7fTSNwY02cQpDgrT_HX3GGSt-MgicLN9uK40B5CZ4HIr-jN5i1PGTQ"
}
`

# Result 
`{
    "message": "Auction status updated successfully"
}`