# query-postgresql

Make query to PostgreSQL and return JSON

[![Test `query-postgresql` action](https://github.com/yakubique/query-postgresql/actions/workflows/test-myself.yaml/badge.svg)](https://github.com/yakubique/query-postgresql/actions/workflows/test-myself.yaml)

## Usage

For live examples, please see [actions](https://github.com/yakubique/query-postgresql/actions/workflows/test-myself.yaml)

```yaml
uses: yakubique/query-postgresql@v1.2
with:
  query: |
    select true as result
  host: ${{ env.PG_HOST }}
  port: ${{ env.PG_PORT }}
  username: ${{ env.PG_USER }}
  password: ${{ env.PG_PWD }}
  db: ${{ env.PG_DB }}
  ssl: 'false'
```

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

|   INPUT   |  TYPE  | REQUIRED | DEFAULT  |                DESCRIPTION                 |
|-----------|--------|----------|----------|--------------------------------------------|
|    db     | string |   true   |          |               PostgreSQL db                |
|   host    | string |   true   |          |              PostgreSQL host               |
| username  | string |   true   |          |            PostgreSQL username             |
| password  | string |   true   |          |            PostgreSQL password             |
|   port    | string |   true   | `"5432"` |      PostgreSQL port (default: 5432)       |
|   query   | string |   true   |          | SQL query (query file if `from_file=true`) |
|    ssl    | string |  false   | `"true"` |       SSL enabled (default: 'true')        |
| from_file | string |  false   |          |  Read query from file (default: 'false')   |
|  to_file  | string |  false   |          |   Save result to file (default: 'false')   |

<!-- AUTO-DOC-INPUT:END -->


## Outputs

<!-- AUTO-DOC-OUTPUT:START - Do not remove or modify this section -->

| OUTPUT |  TYPE  |             DESCRIPTION             |
|--------|--------|-------------------------------------|
| count  | string |             Rows count              |
| result | string | PostgreSQL response OR path to file |

<!-- AUTO-DOC-OUTPUT:END -->


----

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S1UZ9P7)
