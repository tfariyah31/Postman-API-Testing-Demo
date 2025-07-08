# Postman API Testing Demo

This project demonstrates API testing using Postman, Newman, and GitHub Actions for CI automation.

## Tools Used
- Postman
- Newman
- GitHub Actions

## What’s Included
- Automated tests for a sample API (e.g., ReqRes)
- Newman test report
- CI workflow to run tests on every push

## Run Tests Locally
```bash
newman run postman/DemoAPI.postman_collection.json \
  -e postman/DemoAPI.postman_environment.json \
  -r cli,html --reporter-html-export TestResults/newman-report.html
