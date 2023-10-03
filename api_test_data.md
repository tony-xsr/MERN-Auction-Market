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



# Get information about ongoing auctions
`http://localhost:8080/api/auction/getAllAuction`


# Result 
`{
    "auctions": [
        {
            "_id": "651a9bca169b60b2fba14aaf",
            "itemName": "item name 1",
            "description": "test description",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1200px-Test-Logo.svg.png",
            "seller": "65199df1c1de2a4bd8060cc8",
            "startingBid": 10.5,
            "status": "published",
            "created": "2023-10-02T10:30:34.495Z",
            "bidStart": "2023-10-02T10:30:34.495Z",
            "bids": [],
            "__v": 0,
            "bidEnd": "2023-10-03T16:54:17.223Z"
        },
        {
            "_id": "651af0c25d24f8ec511e7df4",
            "itemName": "testing 01",
            "description": "test from web",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NB1F_LdSh8gQpHAkVv6MjDSJ0S-Lj0gnYxOBdxZUOA&s",
            "bidEnd": "2023-10-03T14:44:12.371Z",
            "seller": "65199df1c1de2a4bd8060cc8",
            "startingBid": 10,
            "status": "published",
            "created": "2023-10-02T16:33:06.064Z",
            "bidStart": "2023-10-02T16:33:06.064Z",
            "bids": [],
            "__v": 0
        },
        {
            "_id": "651af1795d24f8ec511e7df9",
            "itemName": "testing 02",
            "description": "test from web 2",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NB1F_LdSh8gQpHAkVv6MjDSJ0S-Lj0gnYxOBdxZUOA&s",
            "bidEnd": "2023-10-03T14:44:12.371Z",
            "seller": "65199df1c1de2a4bd8060cc8",
            "startingBid": 12,
            "status": "published",
            "created": "2023-10-02T16:36:09.022Z",
            "bidStart": "2023-10-02T16:36:09.022Z",
            "bids": [],
            "__v": 0
        }
    ]
}`


# Adding Money For Test 
Note that you have to define NODE_ENV=development
`http://localhost:8080/api/auction/addmoney`

# POST with DATA
`{
    "userId":"65199df1c1de2a4bd8060cc8",
    "amount":"1000"
}`


# RESULT
`{
    "user": {
        "_id": "65199df1c1de2a4bd8060cc8",
        "name": "test111",
        "email": "test36@gmail.com",
        "password": "$2a$12$PhuFVs6nExRR4g2cBi79KebD5FOYJH9aeBSGkcaIM/Qpax1s5KUWq",
        "seller": false,
        "createdAuctions": [
            "651a9bca169b60b2fba14aaf",
            "651a9c76169b60b2fba14ab3",
            "651af0c25d24f8ec511e7df4",
            "651af1795d24f8ec511e7df9"
        ],
        "currentBid": [],
        "availableBalance": 1000,
        "lockedBalance": 0,
        "created": "2023-10-01T16:27:29.095Z",
        "__v": 4,
        "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5OWRmMWMxZGUyYTRiZDgwNjBjYzgiLCJpYXQiOjE2OTYzNDYwMzgsImV4cCI6MTY5Njk1MDgzOH0.UYO9pUahLlGFsIWCtDqw4BB52_L0AeI3mPUajxHyhdO4IM21xTQ7HK-YBRj7hV967OPtWtPjk8w4OW0pJp4cZg"
    },
    "message": "Money added successfully"
}`


# JOIN AUCTION BY ID
`http://localhost:8080/api/auction/joinAuction`

# DATA
`{
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTFjMzFjOTFkMWQzZGRjZTUwMTc3NGUiLCJpYXQiOjE2OTYzNDY1NzMsImV4cCI6MTY5NjYwNTc3M30.cxbmLbE8-pF2BA5D7TdQLmht4qcSKdH5iwe4QiUef0vb2dtqch7cPWre6bVqZVW5CiWzLz6P-rB8Tpp2mBfn2w",
    "money": 2,
    "auctionId": "651a9bca169b60b2fba14aaf"

}`

# RESULT
`{
    "error": "Insufficient balance to join the auction"
}`

ADD MONEY AND THEN TRY
`
{
    "message": "Joined the auction successfully"
}
`
IF YOU BID WITH LOWER THE HIGHTEST MONEY ITS WILL ERROR
`
{
    "error": "Bid amount should be higher than the current highest bid"
}
`
Your can't join your auction event
`{
    "error": "Your can`t join your auction events"
}`

 