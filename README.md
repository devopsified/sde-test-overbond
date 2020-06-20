This application uses Node and hence node and npm are required to execute.
Extract the zip file and use the below command to execute.

# Command to execute application

npm start <input-file> <output-file>
or
npm run compute <input-file> <output-file>

By default, it takes data.json and returns result in results.json.

# Input

Json Object which contains both Corporate and Government bond

{
  "data": [
    {
      "id": "c1",
      "type": "corporate",
      "tenor": "10.3 years",
      "yield": "5.30%",
      "amount_outstanding": 1200000
    },
    {
      "id": "g1",
      "type": "government",
      "tenor": "9.4 years",
      "yield": "3.70%",
      "amount_outstanding": 2500000
    },
    {
      "id": "c2",
      "type": "corporate",
      "tenor": "13.5 years",
      "yield": null,
      "amount_outstanding": 1100000
    },
    {
      "id": "g2",
      "type": "government",
      "tenor": "12.0 years",
      "yield": "4.80%",
      "amount_outstanding": 1750000
    }
  ]
}

# Output

Json Object consisting of Corporate bond id, Government bond id and spread

{
  "data": [
    {
      "corporate_bond_id": "c1",
      "government_bond_id": "g1",
      "spread_to_benchmark": "160 bps"
    }
  ]
}

# Test case

npm -i mocha

npm -i chai

npm test

# Behaviours

There are multiple cases considered :

1. If any of the value in Corporate bond/Government bond is null, that section is not considered for further operations.

2. For each corporate bond, the Government bond with least tenure difference is considered to be benchmark.

3. If tenure differences results in tie, government bond with the largest amount outstanding is considered.

4. ### Addition case : If largest amount outstanding results in tie, then both the Government bonds are resulted. However, this can be modified to get the result which that maximum "yield".

## Additional information

NodeJs was used as it is easy to build and is lightweight. 
Also, testData.json is included to check the behaviour which is mentioned in point 4 above.
Basic test case is included to check the validity of bonds.

Due to time constraint, Containerization is not done. however will update the same in sometime if the solution can still be considered.

### Run time complexity is O(n^2) as, for each Corporate bond multiple Goverment bonds are compared.