## Describe your changes

- I did an awesome feature.

## Issue ticket code (and/or) and link

- [Link to JIRA ticket](#https://ticket-url)

### **General**

- [ ] types for input and output params
- [ ] no `any`, should be also added to eslint rules
- [ ] try/catch for any async function
- [ ] no **magic** [numbers](/7d77574ee4bc4e339a68066762e887cb)
- [ ] compare only with constants not with strings (instead of user === ‘admin’, better user === roles.admin)
- [ ] no ternary operator inside ternary operator (bad example: question ? first: second ? third: fourth)
- [ ] avoid similar types with duplicating by generics
- [ ] no **console.log** in pr
- [ ] .env file should be in .gitignore
- [ ] delete commented code if it's not part of documentation
- [ ] no links in the code, env links should be in env file (for example: server url), constant links (for example default avatar URL) should be in constant file
- [ ] **constants** and **function** names should be lowercase.
- [ ] no dates format in the code (like "dd/MM/yyyy”), move it in global constant variable
- [ ] import rules. imports should come in a specific order: node modules, absolute path, relative path
- [ ] strings should be in the constant variable. Example: instead of ‘15 3 \* \* _’, const EACH_DAY_15h_15min = ‘15 3 _ \* \*’

### Backend

- [ ] swagger for each endpoint. add in the documentation, different types of responses.
      on a successful response (2xx), on unsuccessful response (4xx, 5xx)
- [ ] less requests to db, all data should be taken with one query
- [ ] **public** in method use only is use function externally
- [ ] use ConfigService instead of **process.env**
- [ ] use @`@index` decorator for frequently requested data
- [ ] use transactions if there is a call chain that mutates data in different tables
- [ ] add a set of rules for [nestjs](https://github.com/darraghoriordan/eslint-plugin-nestjs-typed) to the .eslint config file. It helps to prevent bugs and confusing moments
- [ ] use [REST API Naming Convention](https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5) for endpoints

  P.S: more information about RESTful API design by [Microsof](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)t

- [ ] use ‘**UUIDs**` for primary key, ** to prevent Enumeration Attacks**
