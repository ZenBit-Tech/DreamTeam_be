## Describe your changes

- I did an awesome feature.

## Issue ticket code (and/or) and link

- [Link to JIRA ticket](#https://ticket-url)

### **General**

- [ ] Assigned myself to the PR
- [ ] Assigned the appropriate labels to the PR
- [ ] Assigned the appropriate reviewers to the PR
- [ ] Updated the documentation
- [ ] Performed a self-review of my code
- [ ] Types for input and output parameters
- [ ] Don't have "any" on my code
- [ ] Used the try/catch pattern for error handling
- [ ] Don't have magic numbers
- [ ] Compare only with constants not with strings
- [ ] No ternary operator inside the ternary operator
- [ ] Don't have commented code
- [ ] no links in the code, env links should be in env file (for example: server url), constant links (for example default avatar URL) should be in constant file.
- [ ] Used camelCase for variables and functions
- [ ] Date and time formats are on the constants
- [ ] Functions are public only if it's used outside the class
- [ ] No hardcoded values
- [ ] covered by tests
- [ ] Check your commit messages meet the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/).

### Backend

- [ ] Swagger documentation updated
- [ ] Database requests are optimized and not redundant
- [ ] Unit tests written
- [ ] use ConfigService instead of process.env
- [ ] use transactions if there is a call chain that mutates data in different tables
- [ ] use @index decorator for frequently requested data
